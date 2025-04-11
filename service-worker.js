// Simple service worker for basic offline support
const CACHE_NAME = "ajish-portfolio-cache-v1"
const urlsToCache = [
  "/",
  "/index.html",
  "/css/main.css",
  "/js/main.js",
  "/js/modules/animations.js",
  "/js/modules/filters.js",
  "/js/modules/mobileMenu.js",
  "/js/modules/terminal.js",
  "/assets/profile_pic.png",
  "/assets/ai-grid.svg",
  "/assets/Resume.pdf",
  "/manifest.json",
  "/components/nav.html",
  "/components/sidebar.html",
  "/components/about.html",
  "/components/skills.html",
  "/components/services.html",
  "/components/experience.html",
  "/components/education.html",
  "/components/portfolio.html",
  "/components/collaborations.html",
  "/components/contact.html",
  "/components/footer.html",
]

self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("[ServiceWorker] Caching app shell");
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error("[ServiceWorker] Cache install error:", error);
      })
  );
})

self.addEventListener("fetch", (event) => {
  console.log("[ServiceWorker] Fetch", event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).catch(error => {
          console.error("[ServiceWorker] Fetch error:", error);
          // You might want to return a custom offline page here
        });
      })
  );
})

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log("[ServiceWorker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  // Force the service worker to take control immediately
  return self.clients.claim();
})
