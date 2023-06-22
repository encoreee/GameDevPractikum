import { apiFetch, API_ADDRESS } from '@infrastructure/apiFetch';
import fetch from 'node-fetch';

const requestOptions = {
  method: 'GET',
  credentials: 'include',
};

export async function fetchAsync(
  callback: (arg0: any) => any,
  cookies: string
) {
  try {
    const res = await fetch(`${API_ADDRESS}/auth/user`, {
      ...requestOptions,
      headers: { cookie: cookies },
    });

    const data = await res.json();

    return callback(data);
  } catch (e) {
    console.log(e);
  }
}
