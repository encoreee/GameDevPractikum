declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'app-cache-v1';
const URLS = ['/index.html', '/app.js', '/assets/background.png', '/'];
const TIMEOUT = 400;

const fromNetwork = (request: Request): Promise<Response> => {
  return new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, TIMEOUT);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
};

const fromCache = (request: Request) => {
  return caches
    .open(CACHE_NAME)
    .then((cache) =>
      cache
        .match(request)
        .then((matching) => matching || Promise.reject('no-match'))
    );
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(URLS);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(() => {
            /* Нужно вернуть true, если хотите удалить этот файл из кеша совсем */
          })
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fromNetwork(event.request).catch((err) => {
      console.log(`Error: ${err}`);
      return fromCache(event.request);
    })
  );
});

skipWaiting();
export {};
