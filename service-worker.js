// service-worker.js
const CACHE_NAME = 'lyma-shop-v1';
const urlsToCache = [
  '/lymashop.github.io/',
  '/lymashop.github.io/index.html',
  '/lymashop.github.io/404.html',
  '/lymashop.github.io/403.html',
  '/lymashop.github.io/500.html',
  '/lymashop.github.io/502.html',
  '/lymashop.github.io/cart.html',
  '/lymashop.github.io/wishlist.html',
  '/lymashop.github.io/about.html',
  '/lymashop.github.io/contact.html',
  '/lymashop.github.io/catalog.html',
  '/lymashop.github.io/product.html',
  '/lymashop.github.io/pwa-install-banner.js',
  '/lymashop.github.io/cart.js',
  '/lymashop.github.io/wishlist.js',
  '/lymashop.github.io/loadingscreen.js',
  
  // Ajoutez ici vos CSS, JS et assets principaux
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Stratégie de cache : Cache-first, puis réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            // Vérifier si nous avons reçu une réponse valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone la réponse, car elle est un stream qui ne peut être consommé qu'une fois
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
