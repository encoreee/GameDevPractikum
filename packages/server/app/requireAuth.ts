import { Request, Response, NextFunction } from 'express';

// middleware для проверки авторизации
async function requireAuth(req: Request, res: Response, next: NextFunction) {
  // выполнение запроса для получения данных о пользователе
  try {
    const user = await getUser();
    if (!user) {
      return res.sendStatus(403);
    }

    next();
  } catch (err) {
    res.sendStatus(403);
  }
}

interface User {
  id: number;
}

async function getUser(): Promise<number | undefined> {
  const url = `https://ya-praktikum.tech/api/v2/auth/user`;
  const response = await fetch(url);
  const data = (await response.json()) as User;
  if (data) {
    return data.id;
  }

  return undefined;
}
