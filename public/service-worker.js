/*
 * Tombstone.
 *
 * The previous version of this site registered a cache-first service worker
 * that precached "/", "/index.html", "/style.css" and "/script.js". Those files
 * no longer exist, so any visitor still holding that worker is served the old
 * portfolio out of its cache — indefinitely, because the worker's own update
 * check used to land on the SPA 404 fallback and abort on a MIME mismatch.
 *
 * This file exists at the same URL so that check succeeds, sees different
 * bytes, installs, and then removes the worker and every cache it left behind.
 * It deliberately registers no fetch handler: once activated it is a no-op and
 * the registration is gone. Nothing in the app registers a worker any more.
 *
 * Safe to delete once enough time has passed that no stale registrations remain
 * in the wild. There is no cost to leaving it.
 */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));

      await self.registration.unregister();

      // Reload open tabs so they pick up the real site rather than whatever the
      // old worker last handed them.
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        client.navigate(client.url);
      }
    })(),
  );
});
