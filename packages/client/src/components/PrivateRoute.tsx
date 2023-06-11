import { FC, PropsWithChildren } from 'react';
import { useGetUserInfoQuery, usePostOauthQuery } from '@/app/apiSlice';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { REDIRECT_URI } from '@/utils/const';

import LoadingScreen from './LoadingScreen';

const PrivateRoute: FC<PropsWithChildren> = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get('code');
  const isOauthRequired = !!accessToken;

  const {
    isError: isOauthError,
    isSuccess: isOauthSuccess,
    isLoading: isOauthLoading,
    error,
  } = usePostOauthQuery(
    accessToken
      ? {
          code: accessToken,
          redirect_uri: REDIRECT_URI,
        }
      : skipToken
  );

  const { data, isLoading: isDataLoading } = useGetUserInfoQuery(
    isOauthRequired && !isOauthSuccess ? skipToken : undefined
  );

  if (isDataLoading || isOauthLoading) {
    return <LoadingScreen />;
  }

  if (isOauthError) {
    console.error('OauthError: ', error);
    return <Navigate to="/signin?error=Oauth%20error" replace />;
  }

  if (!isOauthRequired && !data) {
    return <Navigate to="/signin" replace />;
  }

  if (isOauthRequired && isOauthSuccess) {
    return <Navigate to="/" replace />;
  }

  if (!isOauthRequired && data) {
    return <Outlet />;
  }

  return <LoadingScreen />;
};

export default PrivateRoute;
