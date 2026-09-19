importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: "AIzaSyCvvHCbhe2SUyaVDqeYrpKDieAe3Zn8mI",
  authDomain: "aiziji-microglow.firebaseapp.com",
  projectId: "aiziji-microglow",
  storageBucket: "aiziji-microglow.firebasestorage.app",
  messagingSenderId: "771651227139",
  appId: "1:771651227139:web:ab962ddb6e840f6e088836"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle =
    payload.notification?.title || '💡 微光出現了';

  const notificationOptions = {
    body:
      payload.notification?.body ||
      '離開一下，再回來。',
    icon: './icon-192.png',
    badge: './icon-192.png',
    data: {
      url: './'
    }
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
const CACHE_NAME = 'aiziji-microglow-v2';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
