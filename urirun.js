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

  var cfg = {
    site:     attr('site', location.hostname),
    endpoint: attr('endpoint', 'https://web.urirun.com/collect.php'),
    clicks:   attr('clicks', '1') !== '0',   // auto-track kliknięć
    load:     attr('load', '1') !== '0',     // auto-track pageview
    spa:      attr('spa', '1') !== '0',      // auto-track nawigacji SPA
    forms:    attr('forms', '1') !== '0',    // auto-track wysyłki formularzy
    outbound: attr('outbound', '1') !== '0'  // auto-track linków wychodzących
  };

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
        if (navigator.sendBeacon(uri)) return;
      } catch (e) { /* fallback */ }
    }
    // 2) fallback: obraz 1x1 (czysty URI GET)
    try {
      var img = new Image();
      img.referrerPolicy = 'no-referrer-when-downgrade';
      img.src = uri;
    } catch (e) { /* cisza — tracker nigdy nie psuje strony */ }
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
    config: cfg
  };
})(window, document);
