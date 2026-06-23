/**
 * js.urirun.com — lekki tracker zdarzeń (event beacon)
 * ---------------------------------------------------------------------------
 * Dodaj w <head> obserwowanej strony:
 *
 *   <script src="https://js.urirun.com/urirun.js"
 *           data-site="shop"
 *           data-endpoint="https://web.urirun.com/collect.php"
 *           defer></script>
 *
 * Skrypt automatycznie wysyła do web.urirun.com (w postaci URI) zdarzenia:
 *   - pageview  — załadowanie strony
 *   - click     — kliknięcie w <button>, <a>, [role=button], [data-uri-event]
 *   - submit    — wysłanie formularza
 *   - navigate  — zmiana adresu w SPA (pushState / popstate / hashchange)
 *   - outbound  — kliknięcie w link prowadzący na inną domenę
 *   - hidden    — opuszczenie / ukrycie karty (flush)
 *
 * Dodatkowo udostępnia ręczne API:
 *   window.urirun.track('checkout', { value: '199.00', label: 'Kup teraz' });
 *   window.urirun.invoke('scanner://host/capture/command/run', { ... });
 *   window.urirun.registerAction('scanner://page/camera/command/start', handler);
 *
 * Brak zależności, ~3 KB. Wysyłka przez navigator.sendBeacon z fallbackiem na
 * obraz 1x1 (URI), więc działa nawet przy nawigacji/zamykaniu karty.
 */
(function (window, document) {
  'use strict';

  if (window.__urirun_loaded) return;
  window.__urirun_loaded = true;

  // --- konfiguracja z atrybutów <script data-*> ----------------------------
  var script = document.currentScript ||
    (function () {
      var s = document.getElementsByTagName('script');
      return s[s.length - 1];
    })();

  function attr(name, fallback) {
    var v = script && script.getAttribute('data-' + name);
    return (v === null || v === undefined || v === '') ? fallback : v;
  }

  // Debug włączony gdy: data-debug="1", ?urirun-debug w URL, albo na localhost.
  function debugDefault() {
    try {
      if (/[?&]urirun-debug\b/.test(location.search)) return true;
      if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return true;
      if (location.protocol === 'file:') return true;
    } catch (e) {}
    return false;
  }

  var cfg = {
    site:     attr('site', location.hostname),
    endpoint: attr('endpoint', 'https://web.urirun.com/collect.php'),
    actionEndpoint: attr('action-endpoint', '/api/uri/invoke'),
    credentials: attr('credentials', 'same-origin'),
    clicks:   attr('clicks', '1') !== '0',   // auto-track kliknięć
    load:     attr('load', '1') !== '0',     // auto-track pageview
    spa:      attr('spa', '1') !== '0',      // auto-track nawigacji SPA
    forms:    attr('forms', '1') !== '0',    // auto-track wysyłki formularzy
    outbound: attr('outbound', '1') !== '0', // auto-track linków wychodzących
    debug:    attr('debug', null) !== null ? attr('debug', '0') !== '0' : debugDefault()
  };

  // --- logowanie do konsoli (tylko w trybie debug) -------------------------
  var STYLE = 'color:#04121c;background:#4cc2ff;padding:1px 5px;border-radius:3px';
  function log() {
    if (!cfg.debug || typeof console === 'undefined') return;
    var args = Array.prototype.slice.call(arguments);
    try { console.log('%curirun', STYLE, args.shift(), args.length ? args : ''); }
    catch (e) { try { console.log.apply(console, ['[urirun]'].concat(args)); } catch (e2) {} }
  }

  // --- budowa i wysyłka URI ------------------------------------------------
  function buildURI(type, data) {
    data = data || {};
    var q = [
      's=' + encodeURIComponent(cfg.site),
      'e=' + encodeURIComponent(type),
      'p=' + encodeURIComponent(location.pathname + location.search),
      'u=' + encodeURIComponent(location.href),
      'r=' + encodeURIComponent(document.referrer || ''),
      '_=' + Date.now() // cache-buster dla fallbacku <img>
    ];
    for (var k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k) && data[k] != null) {
        q.push(encodeURIComponent(k) + '=' + encodeURIComponent(String(data[k])));
      }
    }
    return cfg.endpoint + '?' + q.join('&');
  }

  function send(type, data) {
    var uri = buildURI(type, data);
    // 1) sendBeacon — przetrwa nawigację i zamknięcie karty
    if (navigator.sendBeacon) {
      try {
        if (navigator.sendBeacon(uri)) {
          log('→ ' + type + ' (beacon)', { data: data || {}, uri: uri });
          return;
        }
      } catch (e) { /* fallback */ }
    }
    // 2) fallback: obraz 1x1 (czysty URI GET)
    try {
      var img = new Image();
      img.referrerPolicy = 'no-referrer-when-downgrade';
      img.src = uri;
      log('→ ' + type + ' (img)', { data: data || {}, uri: uri });
    } catch (e) {
      // cisza dla strony, ale w debugu pokaż błąd
      log('✗ ' + type + ' — wysyłka nieudana', { error: String(e), uri: uri });
    }
  }

  // --- helpery -------------------------------------------------------------
  function text(el) {
    var t = (el.getAttribute('aria-label') ||
             el.getAttribute('data-uri-label') ||
             el.value || el.textContent || el.title || '').trim();
    return t.replace(/\s+/g, ' ').slice(0, 120);
  }

  function closest(el, sel) {
    if (el.closest) return el.closest(sel);
    while (el && el.nodeType === 1) {
      if (el.matches && el.matches(sel)) return el;
      el = el.parentNode;
    }
    return null;
  }

  function sameSiteLink(href) {
    try { return new URL(href, location.href).hostname === location.hostname; }
    catch (e) { return true; }
  }

  // --- URI action SDK ------------------------------------------------------
  var localActions = {};

  function normalizeURI(uri) {
    return String(uri || '').trim();
  }

  function jsonResponse(resp) {
    return resp.text().then(function (text) {
      var data = {};
      if (text) {
        try { data = JSON.parse(text); }
        catch (e) { data = { ok: false, error: text }; }
      }
      if (!resp.ok || data.ok === false) {
        var err = new Error(data.error || resp.statusText || 'URI action failed');
        err.response = data;
        err.status = resp.status;
        throw err;
      }
      return data;
    });
  }

  function wrapLocalResult(uri, value) {
    if (value && typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'ok')) {
      if (!Object.prototype.hasOwnProperty.call(value, 'uri')) value.uri = uri;
      return value;
    }
    return { ok: true, uri: uri, local: true, result: value == null ? {} : value };
  }

  function registerAction(uri, handler, meta) {
    uri = normalizeURI(uri);
    if (!uri) throw new Error('URI action is required');
    if (typeof handler !== 'function') throw new Error('URI action handler must be a function');
    localActions[uri] = { handler: handler, meta: meta || {} };
    log('action registered', { uri: uri, meta: meta || {} });
    return uri;
  }

  function listActions() {
    var out = [];
    for (var uri in localActions) {
      if (Object.prototype.hasOwnProperty.call(localActions, uri)) {
        out.push({ uri: uri, meta: localActions[uri].meta || {} });
      }
    }
    return out.sort(function (a, b) { return a.uri < b.uri ? -1 : a.uri > b.uri ? 1 : 0; });
  }

  function modeName(options) {
    var mode = options && (options.mode || options.runMode);
    mode = String(mode || 'execute').toLowerCase();
    if (mode === 'dryrun') mode = 'dry-run';
    if (mode === 'simulate') mode = 'dry-run';
    return mode === 'execute' ? 'execute' : 'dry-run';
  }

  function simulatedAction(uri, payload, local, mode) {
    return {
      ok: true,
      uri: uri,
      mode: mode,
      simulated: true,
      local: !!local,
      action: local ? { uri: uri, meta: local.meta || {} } : null,
      payload: payload || {}
    };
  }

  function invoke(uri, payload, options) {
    uri = normalizeURI(uri);
    payload = payload || {};
    options = options || {};
    var mode = modeName(options);
    if (!uri) return Promise.reject(new Error('URI action is required'));

    var local = localActions[uri];
    if (local && options.remote !== true) {
      if (mode !== 'execute') {
        var simulated = simulatedAction(uri, payload, local, mode);
        log('⟳ ' + uri + ' (local dry-run)', simulated);
        return Promise.resolve(simulated);
      }
      log('⇢ ' + uri + ' (local)', { payload: payload });
      return Promise.resolve()
        .then(function () { return local.handler(payload, { uri: uri, meta: local.meta || {}, config: cfg }); })
        .then(function (value) {
          var result = wrapLocalResult(uri, value);
          log('✓ ' + uri + ' (local)', result);
          return result;
        });
    }

    if (!cfg.actionEndpoint) return Promise.reject(new Error('No URI action endpoint configured'));
    log('⇢ ' + uri + ' (remote ' + mode + ')', { payload: payload, endpoint: cfg.actionEndpoint });
    return fetch(cfg.actionEndpoint, {
      method: 'POST',
      credentials: cfg.credentials || 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uri: uri, payload: payload, mode: mode })
    }).then(jsonResponse).then(function (data) {
      log('✓ ' + uri + ' (remote)', data);
      return data;
    });
  }

  function simulate(uri, payload, options) {
    options = options || {};
    options.mode = 'dry-run';
    return invoke(uri, payload || {}, options);
  }

  log('zainicjalizowano', {
    site: cfg.site, endpoint: cfg.endpoint,
    auto: { load: cfg.load, clicks: cfg.clicks, forms: cfg.forms, spa: cfg.spa, outbound: cfg.outbound }
  });

  // --- auto: pageview ------------------------------------------------------
  if (cfg.load) {
    send('pageview', { l: document.title });
  }

  // --- auto: kliknięcia ----------------------------------------------------
  if (cfg.clicks) {
    document.addEventListener('click', function (ev) {
      var sel = 'a, button, [role="button"], input[type="button"], input[type="submit"], [data-uri-event]';
      var el = closest(ev.target, sel);
      if (!el) return;

      // jawny override typu/etykiety przez atrybuty data-*
      var type = el.getAttribute('data-uri-event') || 'click';
      var data = { l: text(el), v: el.getAttribute('data-uri-value') || '' };

      var href = el.getAttribute && el.getAttribute('href');
      if (href) {
        data.href = href;
        if (cfg.outbound && /^https?:/i.test(href) && !sameSiteLink(href)) {
          // link wychodzący — istotne zdarzenie: wysłanie adresu URL
          send('outbound', { l: text(el), href: href });
          return;
        }
      }
      send(type, data);
    }, true);
  }

  // --- auto: formularze ----------------------------------------------------
  if (cfg.forms) {
    document.addEventListener('submit', function (ev) {
      var f = ev.target;
      if (!f || f.nodeName !== 'FORM') return;
      send('submit', {
        l: f.getAttribute('name') || f.getAttribute('id') || f.action || 'form',
        href: f.action || ''
      });
    }, true);
  }

  // --- auto: nawigacja SPA (wysyłanie adresu URL przy zmianie trasy) --------
  if (cfg.spa) {
    var lastPath = location.pathname + location.search + location.hash;
    function onRouteChange(kind) {
      var now = location.pathname + location.search + location.hash;
      if (now === lastPath) return;
      lastPath = now;
      send('navigate', { l: document.title, via: kind });
    }
    ['pushState', 'replaceState'].forEach(function (m) {
      var orig = history[m];
      if (typeof orig !== 'function') return;
      history[m] = function () {
        var ret = orig.apply(this, arguments);
        try { onRouteChange(m); } catch (e) {}
        return ret;
      };
    });
    window.addEventListener('popstate', function () { onRouteChange('popstate'); });
    window.addEventListener('hashchange', function () { onRouteChange('hashchange'); });
  }

  // --- auto: opuszczenie karty (flush) -------------------------------------
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') send('hidden', {});
  });

  // --- publiczne API -------------------------------------------------------
  window.urirun = {
    /** Ręczne zdarzenie: urirun.track('checkout', { value: '199', label: '...' }) */
    track: function (name, data) {
      data = data || {};
      var payload = {};
      if (data.label != null) payload.l = data.label;
      if (data.value != null) payload.v = data.value;
      for (var k in data) {
        if (k !== 'label' && k !== 'value' &&
            Object.prototype.hasOwnProperty.call(data, k)) {
          payload[k] = data[k];
        }
      }
      send(String(name || 'event'), payload);
    },
    /** Wywołaj akcję URI. Najpierw próbuje lokalnego handlera strony, potem endpointu data-action-endpoint. */
    invoke: invoke,
    /** Alias czytelny dla aplikacji, np. urirun.action('scanner://page/...'). */
    action: invoke,
    /** Symuluj akcję URI bez efektów ubocznych, zachowując tę samą nazwę URI. */
    simulate: simulate,
    /** Zarejestruj lokalną akcję strony jako URI. */
    registerAction: registerAction,
    /** Lista lokalnych akcji strony, które może wywołać AI/konsola. */
    listActions: listActions,
    config: cfg,
    /** Włącz/wyłącz logowanie do konsoli w trakcie działania. */
    debug: function (on) { cfg.debug = on !== false; return cfg.debug; }
  };
})(window, document);
