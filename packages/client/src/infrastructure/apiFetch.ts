export const API_ADDRESS = 'https://ya-praktikum.tech/api/v2';

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
