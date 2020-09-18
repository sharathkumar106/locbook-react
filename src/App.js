import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlace from './places/pages/UserPlace';

const App = () => {

  return (
    <Router>
      <main>
        <MainNavigation />
      <Switch>

        <Route path='/' exact>
          <Users />
        </Route>

        <Route path="/:userId/places" exact>
          <UserPlace/>
        </Route>

        <Route path='/places/new' exact>
          <NewPlace />
        </Route>

        <Redirect to="/" />

      </Switch>
      </main>
    </Router>

  );
}

export default App;
