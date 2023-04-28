import { Fragment, FunctionComponent } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import ProfilePage from '@features/profile/ProfilePage';
import GamePage from './features/game/GamePage';

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<></>} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<GamePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forum" element={<></>} />
          <Route path="/leaderboard" element={<></>} />
          <Route path="/singup" element={<></>} />
          <Route path="*" element={<p>Error</p>} />
        </Route>
      </Routes>
    </Fragment>
  );
};

const PrivateRoute: FunctionComponent = () => {
  //return user ? <Outlet /> : <Navigate to="/login" />
  return <Outlet />;
};

export default App;
