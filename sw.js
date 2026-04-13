const CACHE = 'wendler-v2';
const FILES = [
  '/wendler-531/',
  '/wendler-531/index.html',
  '/wendler-531/manifest.json',
  '/wendler-531/icons/icon-192.png',
  '/wendler-531/icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/wendler-531/index.html')))
  );
});
