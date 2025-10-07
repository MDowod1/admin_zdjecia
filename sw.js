// ✅ Nazwa cache z wersją
const CACHE_NAME = "admin-panel-zdj-v3";

// ✅ Lista plików do cache
const FILES_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./panel1.jpg",
  "./panel2.jpg"
];

// ✅ Install – zapisuje pliki w cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  console.log("✅ Service Worker zainstalowany ");
});

// ✅ Activate – usuwa stare cache, zostawia tylko aktualną wersję
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("🗑️ Usuwam stary cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  console.log("🚀 Service Worker aktywny");
});

// ✅ Fetch – serwuje pliki z cache, jeśli są, inaczej z sieci
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});


