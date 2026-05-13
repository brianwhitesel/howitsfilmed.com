/* HIF Pro — Service Worker v1.0
   Cache-first strategy for all app assets.
   Tools and templates cached on first visit for offline on-set use.
*/

const CACHE_NAME = 'hif-pro-v1';
const APP_SHELL = [
  '/app/',
  '/app/index.html',
  '/app/manifest.json'
];

const TOOLS = [
  '/tools/audio-sync-assistant.html',
  '/tools/call-sheet-builder.html',
  '/tools/day-out-of-days.html',
  '/tools/film-budget-builder.html',
  '/tools/gear-checklist.html',
  '/tools/location-scout-tracker.html',
  '/tools/one-liner-schedule.html',
  '/tools/preproduction-checklist.html',
  '/tools/production-calendar.html',
  '/tools/scene-breakdown.html',
  '/tools/script-breakdown-sheet.html',
  '/tools/shot-list-generator.html'
];

const TEMPLATES = Array.from({ length: 50 }, (_, i) => {
  const n = i + 1;
  const padded = String(n).padStart(2, '0');
  // Templates 1-20 have descriptive names, 21-50 are numeric
  const named = {
    '01': 'Shot-List', '02': 'Call-Sheet', '03': 'Client-Proposal',
    '04': 'Invoice', '05': 'Mood-Board', '06': 'Location-Scout',
    '07': 'Talent-Release', '08': 'Equipment-Checklist', '09': 'Production-Schedule',
    '10': 'Client-Onboarding', '11': 'Budget-Tracker', '12': 'Color-Grade-Notes',
    '13': 'Service-Agreement', '14': 'Interview-Shot-Guide', '15': 'Pre-Production-Checklist',
    '16': 'Social-Cut-Planner', '17': 'BTS-Photo-Log', '18': 'Post-Production-Timeline',
    '19': 'Audio-Sound-Notes', '20': 'Gear-Rental-Tracker'
  };
  const suffix = named[padded] ? `-${named[padded]}` : '';
  return `/templates/HIF-Template-${padded}${suffix}.html`;
});

const ALL_ASSETS = [...APP_SHELL, ...TOOLS, ...TEMPLATES];

// ── Install: pre-cache app shell ──────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean up old caches ─────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first, falling back to network ───────────────────────────────
self.addEventListener('fetch', event => {
  // Only handle GET requests for same-origin or app assets
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip non-app requests (CDNs, external fonts, etc.)
  if (!url.pathname.startsWith('/app') &&
      !url.pathname.startsWith('/tools') &&
      !url.pathname.startsWith('/templates')) return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;

        // Not in cache — fetch from network and store
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type === 'opaque') {
              return response;
            }
            const toCache = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
            return response;
          })
          .catch(() => {
            // Offline fallback: return app shell for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/app/index.html');
            }
          });
      })
  );
});

// ── Background sync: cache all tools/templates on first successful load ───────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CACHE_ALL') {
    caches.open(CACHE_NAME).then(cache => {
      // Cache tools and templates progressively — don't block the UI thread
      const batchSize = 5;
      let index = 0;
      const allExtended = [...TOOLS, ...TEMPLATES];

      function cacheBatch() {
        const batch = allExtended.slice(index, index + batchSize);
        if (batch.length === 0) return;
        index += batchSize;
        Promise.allSettled(
          batch.map(url =>
            fetch(url)
              .then(r => r.ok ? cache.put(url, r) : null)
              .catch(() => null)
          )
        ).then(() => {
          // Small delay between batches to stay non-blocking
          setTimeout(cacheBatch, 200);
        });
      }
      cacheBatch();
    });
  }
});
