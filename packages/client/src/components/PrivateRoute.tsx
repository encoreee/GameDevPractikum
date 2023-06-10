import { FC, PropsWithChildren } from 'react';
import { useGetUserInfoQuery, usePostOauthQuery } from '@/app/apiSlice';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';

const REDIRECT_URI = 'http://localhost:3000';

const PrivateRoute: FC<PropsWithChildren> = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get('code');

  const {
    isError,
    isSuccess,
    isLoading: isOauthLoading,
  } = usePostOauthQuery(
    accessToken
      ? {
          code: accessToken,
          redirect_uri: REDIRECT_URI,
        }
      : skipToken
  );

  if (isError) {
    return <Navigate to="/signin?error=Oauth$20error" replace />;
  }

  // if (isSuccess) {
  //   return <Navigate to="/" replace />;
  // }

  console.log(isOauthLoading);
  const { data, isLoading: isUserInfoLoading } = useGetUserInfoQuery(
    isOauthLoading ? skipToken : undefined
  );

  if (isUserInfoLoading) {
    return null;
  }

  return data ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
