import { Request, Response, NextFunction, RequestHandler } from 'express';
import fetch from 'isomorphic-fetch';

export interface Cookies {
  authCookie: string;
  uuid: string;
}

// middleware для проверки авторизации
export const requireAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // выполнение запроса для получения данных о пользователе
  try {
    const id = await getUser(req.cookies);
    if (id) {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

interface User {
  id: number;
}

async function getUser(cookies: Cookies): Promise<number | undefined> {
  try {
    const cookieStr = cookiesToString(cookies);
    const res = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      method: 'GET',
      credentials: 'include',
      headers: { cookie: cookieStr },
    });

    const user = (await res.json()) as User;
    return user.id;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

function cookiesToString(cookies: Cookies): string {
  return Object.entries(cookies).reduce((str, [p, val], i) => {
    const isLast = i == Object.keys(cookies).length - 1;
    return isLast ? `${str}${p}=${val}` : `${str}${p}=${val}; `;
  }, '');
}
