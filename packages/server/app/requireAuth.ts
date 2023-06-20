import { Request, Response, NextFunction, RequestHandler } from 'express';
import fetch from 'cross-fetch';

// middleware для проверки авторизации
export const requireAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // выполнение запроса для получения данных о пользователе
  try {
    console.log(req);
    const id = await getUser();
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

async function getUser(): Promise<number | undefined> {
  try {
    const res = await fetch('https://ya-praktikum.tech/api/v2/auth/user');

    const user = (await res.json()) as User;
    return user.id;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
