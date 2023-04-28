import {
  Fragment,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';

import AuthController from './controllers/authController';
import { User } from './app/user/userSlice';
import { loadUser, selectUser } from './app/user/userSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';

import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { theme } from './theme/theme';
import { store } from './app/store';

import Error from './features/errors/Error';
import HomePage from './features/homepage/Homepage';
import ProfilePage from './features/profile/ProfilePage';
import SignInPage from './features/auth/SignInPage';
import SignUpPage from './features/auth/SignUpPage';
import LeaderBoardPage from './features/leaderboard/LeaderboardPage';

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>

              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route
                element={
                  <PrivateRoute>
                    <Outlet />
                  </PrivateRoute>
                }>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/forum" element={<></>} />
                <Route path="/leaderboard" element={<LeaderBoardPage />} />      
              </Route>
              <Route
                  path="*"
                  element={
                    <Error errorType="404" errorMessage="Page Not Found." />
                  }
                />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </Fragment>
  );
};

const PrivateRoute: FunctionComponent<PropsWithChildren> = () => {
  const [user, setUser] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthController.getUserInfo().then((obj) => {
      if (obj as User) {
        setUser(obj?.id);
        dispatch(loadUser());
      }
      setIsLoading(false);
    });
  }, [user]);

  if (isLoading) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default App;
