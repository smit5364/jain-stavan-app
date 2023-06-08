// firebase-messaging-sw.js

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

workbox.routing.registerRoute(
  new RegExp("^https://fonts.(?:googleapis|gstatic).com/(.*)"),
  new workbox.strategies.CacheFirst({
    cacheName: "google-fonts-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("^https://jaindhun.vercel.app/lyrics"),
  new workbox.strategies.NetworkFirst({
    cacheName: "lyrics-api-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60, // 1 hour
      }),
    ],
  })
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
