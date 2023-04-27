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
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { theme } from './theme/theme';
import { store } from './app/store';

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
                <Route path="/" element={<>Главная страница</>} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/forum" element={<></>} />
                <Route path="/leaderboard" element={<></>} />
                <Route path="/signin" element={<></>} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="*" element={<p>Error</p>} />
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
    //  dispatch(singin({ login: 'your_login', password: 'your_pass' }));
    // dispatch(logout());
    dispatch(loadUser());
  }, []);

  return user ? <Outlet /> : <Navigate to="/login" />;

  //return <Outlet />;
};

export default App;
