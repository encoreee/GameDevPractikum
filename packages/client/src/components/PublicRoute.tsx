import { FC, PropsWithChildren } from 'react';
import { useGetUserInfoQuery } from '@/app/apiSlice';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute: FC<PropsWithChildren> = () => {
  const { data } = useGetUserInfoQuery();

  return data ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
