import { FC, PropsWithChildren } from 'react';
import { useGetUserInfoQuery, usePostOauthQuery } from '@/app/apiSlice';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const REDIRECT_URI = 'http://localhost:3000';

const PrivateRoute: FC<PropsWithChildren> = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get('code');

  if (accessToken) {
    const { isError } = usePostOauthQuery({
      code: accessToken,
      redirect_uri: REDIRECT_URI,
    });

    // if (isError) {
    //   return <Navigate to="/signin?error=Oauth$20error" replace />;
    // }
    console.log(isError);
  }

  const { data, isLoading } = useGetUserInfoQuery();

  if (isLoading) {
    return null;
  }

  return data ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
