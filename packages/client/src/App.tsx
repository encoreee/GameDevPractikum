import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { User, loadUser } from './app/user/userSlice';
import { useAppDispatch } from './app/hooks';
import { unwrapResult } from '@reduxjs/toolkit';

import ProfilePage from '@features/profile/ProfilePage';
import HomePage from '@features/homepage/HomePage';
import Error from '@/features/Errors/Error';
import SignUpPage from './features/auth/SignUpPage';

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<></>} />
        <Route path="/singup" element={<></>} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forum" element={<></>} />
          <Route path="/leaderboard" element={<></>} />

          <Route path="/signin" element={<></>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="*"
            element={<Error errorMessage="Page not found." errorType="404" />}
          />
        </Route>
      </Routes>
    </Fragment>
  );
};

const PrivateRoute: FunctionComponent = () => {
  // const [user, setUser] = useState<User | undefined>(undefined)
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(loadUser())
  //     .then(unwrapResult)
  //     .then(obj => {
  //       if (obj as User) {
  //         setUser(obj)
  //       }
  //     })
  // }, [])

  // return user ? <Outlet /> : <Navigate to="/login" />

  return <Outlet />;
};

export default App;
