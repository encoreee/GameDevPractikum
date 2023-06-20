import { API_ADDRESS } from '@infrastructure/apiFetch';
import fetch from 'cross-fetch';

export async function fetchAsync(
  callback: (arg0: any) => any,
  cookies: string
) {
  try {
    const res = await fetch(`${API_ADDRESS}/auth/user`, {
      method: 'GET',
      credentials: 'include',
      headers: { cookie: cookies },
    });

    const data = await res.json();

    return callback(data);
  } catch (e) {
    console.log(e);
  }
}
