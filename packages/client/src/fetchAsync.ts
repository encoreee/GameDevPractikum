import { apiFetch, API_ADDRESS } from '@infrastructure/apiFetch';
import fetch from 'node-fetch';

// export function apiFetchy() {
//   const request = (method: string) => {
//     return function (
//       url: string,
//       body?: FormData | unknown,
//       headers?: HeadersInit
//     ) {
//       const requestOptions = {
//         method,
//         headers,
//         credentials: 'include',
//       } as RequestInit;

//       requestOptions.credentials = 'include';

//       if (body) {
//         if (body instanceof FormData) {
//           requestOptions.body = body;
//         } else {
//           const newHeaders = new Headers(requestOptions.headers);
//           newHeaders.set('Content-Type', 'application/json');

//           requestOptions.headers = newHeaders;
//           requestOptions.body = JSON.stringify(body);
//         }
//       }

//       return fetch(url, requestOptions);
//     };
//   };

//   return {
//     get: request('GET'),
//     post: request('POST'),
//     put: request('PUT'),
//     delete: request('DELETE'),
//   };
// }

const requestOptions = {
  method: 'GET',
  credentials: 'include',
};

requestOptions.credentials = 'include';

export async function fetchAsync(callback: (arg0: any) => any) {
  try {
    const res = await fetch(`${API_ADDRESS}/auth/user`, requestOptions);

    const data = await res.json();

    return callback(data);
  } catch (e) {
    console.log(e);
  }
}
