import { Fragment, FunctionComponent } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import ProfilePage from '@features/profile/ProfilePage';
import HomePage from '@features/homepage/HomePage';
import Error from '@/features/Errors/Error';

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<></>} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forum" element={<></>} />
          <Route path="/leaderboard" element={<></>} />
          <Route path="/singup" element={<></>} />
          <Route
            path="*"
            element={<Error errorMessage="Page not found." errorType="400" />}
          />
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
