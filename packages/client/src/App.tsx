import { Fragment, FC } from 'react';
import { Outlet, Route, Routes, BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { theme } from './theme/theme';
import { store } from './app/store';

import Error from './features/errors/Error';
import PrivateRoute from './components/PrivateRouter';
import HomePage from './features/homepage/Homepage';
import ProfilePage from './features/profile/ProfilePage';
import SignInPage from './features/auth/SignInPage';
import SignUpPage from './features/auth/SignUpPage';
import LeaderBoardPage from './features/leaderboard/LeaderboardPage';
import ForumPages from '@features/forum/pages';
import GamePage from './features/game/GamePage';
import GameStartPage from './features/gameStart/GameStartPage';
import GameOver from '@features/gameOver/GameOver';

const App: FC = () => {
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
                <Route path="/game" element={<GamePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/forum/*" element={<ForumPages />} />
                <Route path="/game-over" element={<GameOver />} />
                <Route path="/leaderboard" element={<LeaderBoardPage />} />
                <Route path="/signin" element={<></>} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/start" element={<GameStartPage />} />
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

export default App;
