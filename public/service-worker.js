const CACHE_NAME = 'event-app-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
];

// Install Event: add to cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event: remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: return from cache (if cached) or fetch from network (if not cached)
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => {
          return caches.match('/offline.html');
        });
      })
    );
  }
});

// Push Event: show notification
// assume payload is a JSON with a structure like { payload: { title: "Title", body: "Body", url: "URL" } }
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data.json();
  } catch (err) {
    console.error("Error analysing push notification:", err);
  }
  const notifPayload = data.payload || {};
  const title = notifPayload.title || "New Notification";
  const options = {
    body: notifPayload.body || "You have a new notification!",
    icon: "/pwa-192x192.png",
    badge: "/pwa-192x192.png",
    data: {
      url: notifPayload.url || "/" 
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click Event: open URL
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(clientList => {
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});