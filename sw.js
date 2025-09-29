self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("admin-panel-zdj").then((cache) => {
      return cache.addAll([
        "./index.html",
        "./manifest.json",
        "./aparata1.jpg",
        "./aparata2.jpg"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );

});
