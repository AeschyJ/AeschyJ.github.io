const CACHE_NAME = 'cyber-routine-cache-v3';
const PRECACHE_URLS = [
  './',
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'portal-pill.js'
];

// Install - 預加載靜態核心資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate - 清理舊版本快取 (僅過濾自身 cyber-routine- 前綴，確保不誤刪同源其他專案的快取)
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => cacheName.startsWith('cyber-routine-') && !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch - 請求攔截與快取回覆 (Stale-While-Revalidate 策略)
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // 1. 排除非 GET 請求、Google 帳號身分驗證與雲端 API、以及 Chrome 插件資源
  if (
    event.request.method !== 'GET' ||
    url.includes('apis.google.com') ||
    url.includes('accounts.google.com') ||
    url.includes('www.googleapis.com') ||
    url.startsWith('chrome-extension:')
  ) {
    return; // 直接透過網路取得，不經 Service Worker 快取
  }

  // 2. 實施 Stale-While-Revalidate 策略
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // 如果有快取，立即返回，同時在背景更新快取 (確保下一次載入是最新內容)
        event.waitUntil(
          fetch(event.request).then(networkResponse => {
            if (networkResponse.status === 200) {
              return caches.open(CACHE_NAME).then(cache => {
                return cache.put(event.request, networkResponse);
              });
            }
          }).catch(err => {
            console.log('Background sync failed (offline):', err);
          })
        );
        return cachedResponse;
      }

      // 若快取中沒有，則正常請求網路
      return fetch(event.request).then(networkResponse => {
        // 僅快取狀態正常且為基本同源的靜態資源
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(err => {
        // 如果網路完全斷線，且請求為導覽網頁 (Navigate HTML)，則回傳首頁快取
        if (event.request.mode === 'navigate') {
          return caches.match('./') || caches.match('index.html');
        }
        throw err;
      });
    })
  );
});
