/* HIF Pro — Service Worker v2.0
 * Network-first for pages so members ALWAYS get the latest deploy (no stale
 * cache, no hard-refresh needed). Cache is only an offline fallback.
 *
 * Why network-first: the old cache-first SW served stale app/tool versions
 * after every deploy, and aggressively cached gated HTML locally — which
 * fights the membership gate. Network-first keeps content fresh AND lets the
 * server (gatekeeper) stay the source of truth for who can see what.
 *
 * Bump CACHE_VERSION on any change here to purge old caches on next load.
 */
const CACHE_VERSION = 'hif-pro-v2';
const APP_SHELL = ['/app/', '/app/index.html', '/app/manifest.json'];

// ── Install: pre-cache the lightweight app shell only ───────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

// ── Activate: delete every old cache version ────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: network-first for our pages, cache only as offline fallback ───────
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Only handle our own app/tool/template pages; let everything else (fonts,
  // CDNs, the gatekeeper API) go straight to network untouched.
  const ours = url.pathname.startsWith('/app') ||
               url.pathname.startsWith('/tools') ||
               url.pathname.startsWith('/templates');
  if (!ours) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache a copy of good, non-opaque responses for offline fallback.
        if (response && response.status === 200 && response.type !== 'opaque') {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(event.request, copy));
        }
        return response;
      })
      .catch(() =>
        // Offline: serve the cached copy, or the app shell for navigations.
        caches.match(event.request).then(
          (cached) => cached || (event.request.mode === 'navigate' ? caches.match('/app/index.html') : undefined)
        )
      )
  );
});
