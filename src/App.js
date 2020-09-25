import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// import Users from './users/pages/Users';
// import NewPlace from './places/pages/NewPlace';
// import UserPlace from './places/pages/UserPlace';
// import UpdatePlace from './places/pages/UpdatePlace';
// import Authenticate from './users/pages/Authenticate';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/AuthContext';
import { useAuth } from './shared/hooks/auth-hook';

const Users = React.lazy(() => import('./users/pages/Users'));
const Authenticate = React.lazy(() => import('./users/pages/Authenticate'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UserPlace = React.lazy(() => import('./places/pages/UserPlace'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));


const App = () => {

  const { login, logout, token, userId } = useAuth();

  let routes;
  if (token) {
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
      {
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }
    }>
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={
            <div className="center">
              <LoadingSpinner className="white-loader" />
            </div>
          }>{routes}</Suspense>
        </main>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
