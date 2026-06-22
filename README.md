# js-urirun-com

**js.urirun.com** — a tiny (~3 KB), dependency-free event tracker.

Add one line to a website's `<head>` and every meaningful client-side event
(button clicks, page loads, SPA navigations, outbound URLs, form submits) is
beamed **as a URI** to the observation panel at **web.urirun.com**.

```
website  ──(events as URI)──►  js.urirun.com/urirun.js  ──►  web.urirun.com/collect.php  ──►  panel
```

## Install

Put this in the `<head>` of any page you want to observe:

```html
<script src="https://js.urirun.com/urirun.js"
        data-site="my-site"
        data-endpoint="https://web.urirun.com/collect.php"
        defer></script>
```

That's it. The script self-initializes and starts sending events.

## Configuration (`data-*` attributes)

| Attribute        | Default                              | Meaning                                   |
|------------------|--------------------------------------|-------------------------------------------|
| `data-site`      | `location.hostname`                  | Site ID shown in the panel                |
| `data-endpoint`  | `https://web.urirun.com/collect.php` | Where events are sent                     |
| `data-load`      | `1`                                  | Auto-track `pageview` on load             |
| `data-clicks`    | `1`                                  | Auto-track clicks on buttons/links        |
| `data-forms`     | `1`                                  | Auto-track form submits                   |
| `data-spa`       | `1`                                  | Auto-track SPA route changes              |
| `data-outbound`  | `1`                                  | Track clicks to other domains as URLs     |

Set any to `0` to disable, e.g. `data-spa="0"`.

## Auto-tracked events

| Type       | When it fires                                                |
|------------|--------------------------------------------------------------|
| `pageview` | Page finishes loading                                        |
| `click`    | Click on `<button>`, `<a>`, `[role=button]`, submit inputs   |
| `outbound` | Click on a link pointing to a **different domain** (the URL) |
| `submit`   | A `<form>` is submitted                                      |
| `navigate` | SPA route change (`pushState`/`popstate`/`hashchange`)       |
| `hidden`   | Tab becomes hidden / user leaves                             |

## Custom events

Mark any element to send a custom event on click:

```html
<button data-uri-event="checkout" data-uri-value="199.00">Buy now</button>
<a href="/pricing" data-uri-label="Pricing CTA">See pricing</a>
```

Or fire programmatically:

```js
window.urirun.track('checkout', { label: 'Buy now', value: '199.00', plan: 'pro' });
```

Arbitrary keys (`plan` above) are forwarded and shown under **+N** in the panel.

## How events travel as a URI

Every event becomes a GET URI like:

```
https://web.urirun.com/collect.php?s=my-site&e=click&p=%2Fcart&u=https%3A%2F%2F...&l=Buy%20now&_=1718000000000
```

Delivery uses `navigator.sendBeacon` (survives navigation/tab close) with an
`<img>` 1×1 beacon fallback — a pure URI GET — so it works everywhere and never
blocks or breaks the host page.

## Build

`urirun.js` (root) is the served file. To regenerate the minified bundle:

```bash
npm install   # terser
npm run build # -> dist/urirun.min.js
```

## Layout

```
urirun.js            # served asset (https://js.urirun.com/urirun.js)
src/urirun.js        # source
dist/urirun.min.js   # minified build
index.html           # live demo
CNAME                # js.urirun.com
```
