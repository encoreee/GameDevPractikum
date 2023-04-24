import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { User, loadUser, selectUser } from './app/user/userSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { unwrapResult } from '@reduxjs/toolkit';

import ProfilePage from '@features/profile/ProfilePage';
import SignUpPage from './features/auth/SignUpPage';
import { logout, singin } from './app/auth/authSlice';

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<></>} />
        <Route path="/singup" element={<></>} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<></>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forum" element={<></>} />
          <Route path="/leaderboard" element={<></>} />
          <Route path="/signin" element={<></>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<p>Error</p>} />
        </Route>
      </Routes>
    </Fragment>
  );
};

const PrivateRoute: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    //  dispatch(singin({ login: 'your_login', password: 'your_pass' }));
    // dispatch(logout());
    dispatch(loadUser());
  }, []);

  return user ? <Outlet /> : <Navigate to="/login" />;

  //return <Outlet />;
};

export default App;
