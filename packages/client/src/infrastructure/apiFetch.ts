let VITE_HOST;

if (import.meta.env.SSR) {
  VITE_HOST = 'http://localhost:3000';
} else {
  VITE_HOST = import.meta.env.VITE_HOST;
}

export const LOCAL_ADDRESS = VITE_HOST;

export const API_ADDRESS = `${LOCAL_ADDRESS}/api/v2`;

class ApiFetch {
  cookies?: string;

  private request(method: string) {
    return (
      urlString: string,
      body?: FormData | unknown,
      headers?: HeadersInit
    ) => {
      const requestInit = {
        method,
        headers,
      } as RequestInit;
      const newHeaders = new Headers(requestInit.headers);

      requestInit.credentials = 'include';

      if (!import.meta.env.SSR) {
        if (body) {
          if (body instanceof FormData) {
            requestInit.body = body;
          } else {
            newHeaders.set('Content-Type', 'application/json');

            requestInit.headers = newHeaders;
            requestInit.body = JSON.stringify(body);
          }
        }
      } else {
        if (body) {
          newHeaders.set('Content-Type', 'application/json');

          requestInit.headers = newHeaders;
          requestInit.body = JSON.stringify(body);
        }
      }

      return this.fetch(urlString, requestInit);
    };
  }
  get = this.request('GET');

  post = this.request('POST');

  put = this.request('PUT');

  delete = this.request('DELETE');

  fetch(requestInfo: RequestInfo, requestInit?: RequestInit) {
    const request = new Request(requestInfo, requestInit);
    if (this.cookies) {
      request.headers.set('Cookie', this.cookies);
    }

    return fetch(request);
  }

  fetchFn = this.fetch.bind(this);

  // Засетить куку в ssr
  useCookie(cookies: string) {
    this.cookies = cookies;
  }
}

export const ApiFetchInstance = new ApiFetch();

export const apiFetch = () => ApiFetchInstance;
