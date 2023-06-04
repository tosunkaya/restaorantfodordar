// (A) CREATE/INSTALL CACHE
self.addEventListener("install", evt => {
  self.skipWaiting();
  evt.waitUntil(
    caches.open("OrderDemo")
    .then(cache => cache.addAll([
      // (A1) IMAGES
      "assets/burger.png",
      "assets/pizza.png",
      "assets/favicon.png",
      "assets/ico-512.png",
      // (A2) PAGES + SCRIPTS
      "assets/1-products.js",
      "assets/2-cart.css",
      "assets/2-cart.js",
      "assets/3-manager.css",
      "assets/3-manager.js",
      "front.json",
      "back.json"
    ]))
    .catch(err => console.error(err))
  );
});

// (B) CLAIM CONTROL INSTANTLY
self.addEventListener("activate", evt => self.clients.claim());

// (C) LOAD FROM CACHE FIRST, FALLBACK TO NETWORK IF NOT FOUND
self.addEventListener("fetch", evt => evt.respondWith(
  caches.match(evt.request).then(res => res || fetch(evt.request))
));
