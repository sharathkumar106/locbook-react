import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlace from './places/pages/UserPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import Authenticate from './users/pages/Authenticate';
import { AuthContext } from './shared/context/AuthContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        
        <Route path="/:userId/places" exact>
          <UserPlace />
        </Route>

        <Route path='/places/new' exact>
          <NewPlace />
        </Route>

        <Route path='/places/:placeId'>
          <UpdatePlace />
        </Route>

        <Redirect to="/" />
      
      </Switch>
    );
  }
  else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlace />
        </Route>
        <Route path='/authenticate' exact>
          <Authenticate />
        </Route>

        <Redirect to="/authenticate" />
      </Switch>
    );
  }



  return (
    <AuthContext.Provider value={
      { isLoggedIn: isLoggedIn, login: login, logout: logout }
    }>
      <Router>
        <main>
          <MainNavigation />
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
