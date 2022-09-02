import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import ParkList from './components/park/parkList';
import TrailList from './components/trail/trailList';
import ParkDetail from './components/park/parkDetail';

import User from './components/User';
import { authenticate } from './store/session';
import TrailDetail from './components/trail/trailDetail';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/parks' exact={true} >
          <ParkList/>
        </ProtectedRoute>
        <ProtectedRoute path='/trails' exact={true} >
          <TrailList/>
        </ProtectedRoute>
        <ProtectedRoute path='/trails/:trailId' exact={true} >
          <TrailDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/parks/:parkId' exact={true} >
          <ParkDetail />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
