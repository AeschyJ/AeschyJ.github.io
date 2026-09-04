const CACHE_NAME = 'museum-showcase-v1';
const PRECACHE_ASSETS = [
  './',
  'index.html',
  'favicon.svg',
  'manifest.webmanifest',
  'portal-pill.js'
];

// 安裝事件：快取基礎資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 啟用事件：清理舊快取 (僅清理自身前綴快取，保護同源其他子專案快取安全)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith('museum-showcase-') && cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 攔截請求 (Stale-While-Revalidate 策略)
self.addEventListener('fetch', (event) => {
  // 只攔截 GET 請求
  if (event.request.method !== 'GET') return;
  
  // 排除 chrome-extension 等非 http 請求
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          // 只有在成功取得回應且是普通 GET 請求時才快取
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch((err) => {
          console.log('Fetch failed, returning cached response if available', err);
        });

        // 優先使用快取，否則等待網路請求
        return cachedResponse || fetchPromise;
      });
    })
  );
});
