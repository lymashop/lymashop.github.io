
const CACHE_NAME = 'lymashop-cache-v1.9'; // Increment version to force update
const DYNAMIC_CACHE_NAME = 'lymashop-dynamic-cache-v1.9';
const OFFLINE_URL = '/offline.html'; 
const APP_SHELL_FILES = [
  '/', // Alias for index.html
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/shortcut-cart-icon.png',
  '/shortcut-catalog-icon.png',
  // Key assets
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=PT+Sans:wght@400;700&family=Playfair+Display:wght@400;700&display=swap',
  // Placeholder images - replace with actual key image URLs if necessary (e.g., logo, hero background if static)
  // 'https://picsum.photos/seed/404page/400/300', // Example placeholder
  // Add other critical static assets here
];

// Install: Cache app shell and offline page
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell and offline page');
      // Cache the offline page first.
      // It's fetched from the network and put into the cache.
      // If it's already in /public, this will effectively cache it.
      const cacheOfflinePage = fetch(OFFLINE_URL).then(response => {
        if (!response.ok) {
            // If fetching fails (e.g. offline during build or OFFLINE_URL is wrong)
            // Create a very basic fallback to ensure something is cached.
             console.warn(`[Service Worker] Failed to fetch ${OFFLINE_URL}. Using basic fallback for cache.`);
             const basicOfflinePage = new Response(`
                <!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Hors Connexion</title><style>body{display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background-color:#A78BFA;color:white;font-family:sans-serif;text-align:center;padding:20px;} h1{font-size:1.5rem;}</style></head>
                <body><div><h1>Lyma Shop - Mode Hors Connexion</h1><p>Veuillez vérifier votre connexion internet.</p></div></body></html>`, 
                { headers: { 'Content-Type': 'text/html' } });
            return cache.put(OFFLINE_URL, basicOfflinePage);
        }
        return cache.put(OFFLINE_URL, response);
      }).catch(error => {
        console.error('[Service Worker] Error caching offline page during install:', error);
      });
      
      const cacheAppShell = cache.addAll(APP_SHELL_FILES).catch(error => {
          console.error('[Service Worker] Failed to cache one or more app shell files:', error);
          // Optionally, you could try to cache them individually and log which ones failed
          APP_SHELL_FILES.forEach(fileUrl => {
              cache.add(fileUrl).catch(err => console.warn(`[Service Worker] Failed to cache individual file: ${fileUrl}`, err));
          });
      });

      return Promise.all([cacheOfflinePage, cacheAppShell]);
    }).catch(error => {
      console.error('[Service Worker] Failed to open cache or cache app shell:', error);
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch: Serve from cache, fallback to network, then offline page
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // For navigation requests (HTML pages), try network first, then cache, then offline page.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // If successful, cache it dynamically for future offline use
          if (response.ok) {
            return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
              // Ensure we don't cache responses that shouldn't be (e.g., from extensions)
              if (request.url.startsWith('http')) { // Only cache http/https requests
                cache.put(request, response.clone());
              }
              return response;
            });
          }
          // If network error (e.g., 404, 500), serve from cache or offline page
          // This also handles the case where the user is offline initially.
          return caches.match(request)
            .then(cachedResponse => cachedResponse || caches.match(OFFLINE_URL))
            .catch(() => caches.match(OFFLINE_URL)); // Final fallback if match also fails
        })
        .catch(() => {
          // Network request failed (e.g., user is offline)
          return caches.match(request)
            .then(cachedResponse => cachedResponse || caches.match(OFFLINE_URL))
            .catch(() => caches.match(OFFLINE_URL)); // Final fallback
        })
    );
    return;
  }

  // For non-navigation requests (CSS, JS, images, fonts), use a cache-first, then network strategy.
  // Stale-while-revalidate for certain assets.
  if (APP_SHELL_FILES.some(shellFile => request.url.startsWith(shellFile)) || request.destination === 'style' || request.destination === 'script' || request.destination === 'font') {
     event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Return cached response if found.
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            // Update the cache with the new version.
            const cacheToUse = APP_SHELL_FILES.includes(request.url) ? CACHE_NAME : DYNAMIC_CACHE_NAME;
            caches.open(cacheToUse).then((cache) => {
               if (request.url.startsWith('http')) { // Only cache http/https requests
                  cache.put(request, networkResponse.clone());
               }
            });
          }
          return networkResponse;
        }).catch(error => {
          console.warn(`[Service Worker] Network fetch failed for ${request.url}:`, error);
          // If it's an image and network fails, could return a placeholder (if cached)
          // For other assets, if not in cache and network fails, it will result in an error on the page.
          if (request.destination === 'image') {
            // return caches.match('/placeholder-image.png'); // You'd need a placeholder cached
          }
        });
        // Return from cache, or fetch from network.
        return cachedResponse || fetchPromise;
      }).catch(err => {
        console.error(`[Service Worker] Cache match failed for ${request.url}`, err);
        // Fallback to network if cache match throws an error
        return fetch(request).catch(() => {
            if (request.mode === 'navigate') return caches.match(OFFLINE_URL);
        });
      })
    );
    return;
  }
  
  // For other GET requests (e.g., images not in app shell, API calls if configured for caching)
  // Use a cache-first, then network strategy for dynamic content like product images.
  if (request.method === 'GET' && request.destination === 'image') {
      event.respondWith(
          caches.match(request).then(cachedResponse => {
              if (cachedResponse) {
                  return cachedResponse;
              }
              return fetch(request).then(networkResponse => {
                  if (networkResponse && networkResponse.ok) {
                      return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                          if (request.url.startsWith('http')) {
                            cache.put(request, networkResponse.clone());
                          }
                          return networkResponse;
                      });
                  }
                  return networkResponse; 
              });
          }).catch(() => {
             // Optionally return a generic placeholder for images if all else fails
             // return caches.match('/path/to/generic-placeholder.png');
          })
      );
      return;
  }


  // For other types of requests, or if not handled above, just pass through.
  // This is important for things like Formspree POST requests.
  event.respondWith(fetch(request).catch(() => {
    // Only provide offline page for navigate requests that fail network and aren't in cache.
    // Other request types (API calls, etc.) should fail naturally if offline and not cached.
    if (request.mode === 'navigate') {
        return caches.match(OFFLINE_URL);
    }
  }));
});


// Background Sync for Formspree (Example - requires storing requests in IndexedDB for full functionality)
self.addEventListener('sync', (event) => {
  if (event.tag === 'formspree-contact-sync') {
    console.log('[Service Worker] Background sync: formspree-contact-sync');
    // This is a placeholder. A full implementation would:
    // 1. Intercept fetch in the 'fetch' event for Formspree POSTs.
    // 2. If offline, store request details (URL, method, body, headers) in IndexedDB.
    // 3. Register for 'sync' tag.
    // 4. In this 'sync' event, retrieve stored requests from IndexedDB and re-fetch them.
    // 5. Upon success, remove from IndexedDB.
    // For now, this just logs. The browser might retry some form submissions automatically.
  }
});

// Message listener for controlling the Service Worker (e.g., skip waiting)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
