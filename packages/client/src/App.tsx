import { Fragment, FC, useEffect } from 'react';
import { Outlet, Route, Routes, BrowserRouter } from 'react-router-dom';
import { startServiceWorker } from './utils/serviceWorkersRegistration';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import LeaderBoardPage from './features/leaderboard/LeaderboardPage';
import GamePage from './features/game/GamePage';
import Error from './features/errors/Error';
import PrivateRoute from './components/PrivateRouter';
import HomePage from './features/homepage/Homepage';
import ProfilePage from './features/profile/ProfilePage';
import SignInPage from './features/auth/SignInPage';
import SignUpPage from './features/auth/SignUpPage';
import GameStartPage from './features/gameStart/GameStartPage';
import ForumPages from './features/forum/pages';
import GameOver from './features/gameOver/GameOver';

const App: FC = () => {
  useEffect(() => {
    startServiceWorker();
  }, []);

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
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
            element={<Error errorType="404" errorMessage="Page Not Found." />}
          />
        </Routes>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
