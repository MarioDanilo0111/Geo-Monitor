self.addEventListener("install", function (event) {
  console.log("🛠️ Service Worker installing...");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("🚀 Service Worker activated!");
});

self.addEventListener("fetch", function (event) {});
