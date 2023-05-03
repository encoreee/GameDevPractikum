import { Fragment, FunctionComponent, useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import { loadUser, selectUser } from './app/user/userSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import ProfilePage from '@features/profile/ProfilePage';
import SignUpPage from './features/auth/SignUpPage';
import Error from './features/errors/Error';
import HomePage from './features/homepage/Homepage';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { theme } from './theme/theme';
import { store } from './app/store';
import LeaderBoardPage from './features/leaderboard/LeaderboardPage';
import GamePage from './features/game/GamePage';

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<></>} />
              <Route path="/singup" element={<></>} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/forum" element={<></>} />
                <Route path="/leaderboard" element={<LeaderBoardPage />} />
                <Route path="/signin" element={<></>} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                  path="*"
                  element={
                    <Error errorType="404" errorMessage="Page Not Found." />
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </Fragment>
  );
};

const PrivateRoute: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default App;
