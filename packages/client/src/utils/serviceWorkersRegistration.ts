export function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/assets/networkCacheServiceWorker.js')
          .then((registration) => {
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            );
          })
          .catch((error: string) => {
            // continue despite the error
          });
      });
    }
  }
}
