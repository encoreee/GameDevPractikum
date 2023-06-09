import { FC, PropsWithChildren } from 'react';
import { useGetUserInfoQuery } from '@/app/apiSlice';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute: FC<PropsWithChildren> = () => {
  const { data, isLoading } = useGetUserInfoQuery();

  if (isLoading) {
    return null;
  }

  return data ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
