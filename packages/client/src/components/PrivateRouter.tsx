import AuthController from '../controllers/authController';
import { FC, useState, useEffect, PropsWithChildren } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { User } from '../app/user/userSlice';

const PrivateRoute: FC<PropsWithChildren> = () => {
  const [user, setUser] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthController.getUserInfo().then((obj) => {
      if (obj as User) {
        setUser(obj?.id);
      }
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
