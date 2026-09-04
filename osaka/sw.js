// Service Worker for Japan Travel PWA & Emaki Magazine (TabiSync v4.9.2)
const CACHE_NAME = 'tabisync-v4.9.2-dome-videos';






const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './magazine.html',
  './manifest.json',
  './magazine-manifest.json',
  './css/design-system.css',
  './css/components.css',
  './css/journal.css',
  './css/responsive.css',
  './css/magazine.css',
  './js/trip-data.js',
  './js/magazine-data.js',
  './js/speech.js',
  './js/storage.js',
  './js/map.js',
  './js/journal.js',
  './js/app.js',
  './js/magazine.js',
  './js/portal-pill.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn('[SW] Cache add warning for:', url, err);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// 啟用事件：清理舊快取 (僅清理自身專案前綴 tabisync- 與 shiori-，防護同源其他專案快取安全)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if ((key.startsWith('tabisync-') || key.startsWith('shiori-')) && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // 大檔案影片直接走網路直通，避免塞滿行動端 CacheStorage 配額
  if (event.request.url.includes('.mp4')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 核心 HTML、JS 與 CSS 採用 Network-First 策略，保證立即取得最新代碼
  const isCodeAsset = event.request.mode === 'navigate' || 
                      event.request.url.endsWith('.html') || 
                      event.request.url.includes('/js/') || 
                      event.request.url.includes('/css/');

  if (isCodeAsset) {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }

  // 其他靜態資源 (相片、圖示、字體) 採用 Cache-First 策略以加速載入
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        return cachedResponse || new Response('Offline resource not cached', { 
          status: 503, 

          headers: { 'Content-Type': 'text/plain' } 
        });
      });
    })
  );
});

