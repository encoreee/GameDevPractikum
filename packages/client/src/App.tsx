import { Fragment, FunctionComponent } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'

const App: FunctionComponent = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<></>} />
        <Route element={<></>}>
          <Route path="/" element={<></>} />
          <Route path="/profile" element={<></>} />
          <Route path="/forum" element={<></>} />
          <Route path="/leaderboard" element={<></>} />
          <Route path="/singup" element={<></>} />
          <Route path="*" element={<p>Error</p>} />
        </Route>
      </Routes>
    </Fragment>
  )
}

const PrivateRoute: FunctionComponent = () => {
  //return user ? <Outlet /> : <Navigate to="/login" />
  return <></>
}

export default App
