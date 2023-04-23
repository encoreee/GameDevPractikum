export const API_ADDRESS = 'https://ya-praktikum.tech/api/v2/';

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

export function apiAuthFetch() {
  const authHeader = (accessToken: string, init?: HeadersInit) => {
    const headers = new Headers(init);

    const bearer = `Bearer ${accessToken}`;
    headers.append('Authorization', bearer);

    return headers;
  };

  const request = (method: string) => {
    return function (
      url: string,
      accessToken: string,
      body?: FormData | unknown,
      headers?: HeadersInit
    ) {
      const requestOptions = {
        method,
        headers: authHeader(accessToken, headers),
      } as RequestInit;

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
