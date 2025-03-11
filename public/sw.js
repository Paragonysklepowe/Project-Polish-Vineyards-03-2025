const CACHE_NAME = 'vineyard-explorer-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/app/root.tsx',
  '/app/routes/_index.tsx',
  '/app/routes/vineyards.tsx',
  '/app/routes/events.tsx',
  '/app/routes/travel-guide.tsx',
  '/app/tailwind.css',
  '/public/logo-dark.png',
  '/public/logo-light.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
});
