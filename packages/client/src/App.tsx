import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthController from './controllers/authController';
import { User } from './app/user/userSlice';

import ProfilePage from './features/profile/ProfilePage';
import SignInPage from './features/auth/SignInPage';
import SignUpPage from './features/auth/SignUpPage';

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<></>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forum" element={<></>} />
          <Route path="/leaderboard" element={<></>} />
        </Route>
        <Route path="*" element={<p>Error</p>} />
      </Routes>
    </Fragment>
  );
};

const PrivateRoute: FunctionComponent = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    AuthController.getUserInfo().then((obj) => {
      if (obj as User) {
        setUser(obj);
      }
    });
  }, []);

  // useEffect(() => {
  //   dispatch(loadUser())
  //     .then(unwrapResult)
  //     .then(obj => {
  //       if (obj as User) {
  //         setUser(obj)
  //       }
  //     })
  // }, [])

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default App;
