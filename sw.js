// Central Portal Hub - Dedicated Service Worker
// Cache Name Scope: hub-portal-cache-* (Guaranteed not to clash with subproject caches)
const CACHE_NAME = 'hub-portal-cache-v2';

const PORTAL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/base.css',
  './css/ambient.css',
  './css/components.css',
  './css/pavilions/experiment.css',
  './css/pavilions/osaka.css',
  './css/pavilions/showcase.css',
  './css/pavilions/ticket.css',
  './css/pavilions/cyber.css',
  './js/app.js',
  './js/storage.js',
  './js/data/pavilionsData.js',
  './js/pavilions/registry.js',
  './js/pavilions/experimentPavilion.js',
  './js/pavilions/osakaPavilion.js',
  './js/pavilions/showcasePavilion.js',
  './js/pavilions/ticketPavilion.js',
  './js/pavilions/cyberPavilion.js'
];

// Install Phase: Pre-cache portal shell resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PORTAL_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Phase: Clean up ONLY legacy hub-portal-cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((key) => {
          // Strictly delete only caches prefixed with hub-portal-cache- and not current version
          if (key.startsWith('hub-portal-cache-') && key !== CACHE_NAME) {
            console.log(`[Portal SW] Purging legacy hub cache: ${key}`);
            return caches.delete(key);
          }
          // Preserve any other project caches intact (e.g. cyber-cache-*, osaka-cache-*)
          return Promise.resolve();
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Phase: Network-first with cache fallback for HTML, Cache-first for static assets
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests and http/https requests within current origin
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // If request is for sub-apps (e.g., /cyber-routine/, /osaka/, /showcase/), let sub-apps' SW or network handle
  const url = new URL(request.url);
  const isSubApp = ['/cyber-routine/', '/osaka/', '/showcase/', '/ticket-bot/', '/lab/'].some(
    subPath => url.pathname.includes(subPath)
  );

  if (isSubApp) {
    // Pass-through to network / sub-project scope
    return;
  }

  // Network-First with Cache fallback strategy for HTML navigation
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Stale-While-Revalidate for CSS/JS/Assets within portal root
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
