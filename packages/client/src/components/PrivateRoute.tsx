import { FC, PropsWithChildren } from 'react';
import { useGetUserInfoQuery, usePostOauthQuery } from '@/app/apiSlice';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const REDIRECT_URI = 'http://localhost:3000';

const PrivateRoute: FC<PropsWithChildren> = () => {
  const { data, isLoading } = useGetUserInfoQuery();

  if (isLoading) {
    return null;
  }

  return data ? <Outlet /> : <Navigate to="/signin" replace />;
};

const PrivateRouteWithOauth: FC<PropsWithChildren> = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get('code');
  let isError = false;

  if (accessToken) {
    const result = usePostOauthQuery({
      code: accessToken,
      redirect_uri: REDIRECT_URI,
    });
    isError = result.isError;
  }

  return isError ? (
    <Navigate to="/signin?error=Oauth$20error" replace />
  ) : (
    <PrivateRoute />
  );
};

export default PrivateRouteWithOauth;
