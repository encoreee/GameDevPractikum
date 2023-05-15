declare const self: ServiceWorkerGlobalScope;

const CACHE = 'my-site-cache-v1';
const URLS = ['/assets/background.png'];
const TIMEOUT = 400;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => {
        console.log('Opened cache');
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
      console.log(`Error: ${err.message()}`);
      return fromCache(event.request);
    })
  );
});

function fromNetwork(request: Request): Promise<Response> {
  return new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, TIMEOUT);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}

function fromCache(request: Request) {
  return caches
    .open(CACHE)
    .then((cache) =>
      cache
        .match(request)
        .then((matching) => matching || Promise.reject('no-match'))
    );
}

export {};
