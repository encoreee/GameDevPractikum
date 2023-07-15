let VITE_HOST;

if (import.meta.env.SSR) {
  VITE_HOST = process?.env?.VITE_HOST;
} else {
  VITE_HOST = import.meta.env.VITE_HOST;
}

export const LOCAL_ADDRESS = VITE_HOST;

export const API_ADDRESS = `${LOCAL_ADDRESS}/api/v2`;

export function apiFetch() {
  const request = (method: string) => {
    return function (
      url: string,
      body?: FormData | unknown,
      headers?: HeadersInit
    ) {
      const requestOptions = {
        method,
        headers,
        credentials: 'include',
      } as RequestInit;

      requestOptions.credentials = 'include';

      if (body) {
        if (body instanceof FormData) {
          requestOptions.body = body;
        } else {
          const newHeaders = new Headers(requestOptions.headers);
          newHeaders.set('Content-Type', 'application/json');

          requestOptions.headers = newHeaders;
          requestOptions.body = JSON.stringify(body);
        }
      }

      return fetch(url, requestOptions);
    };
  };

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  };
}
