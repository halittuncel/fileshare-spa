import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Login from './components/Login';
import Register from './components/Register';
import Folders from './components/Folders';
import Files from './components/Files';
import Links from './components/Links';
import Navbar from './components/Navbar';

import { token } from './utils';
import AccessLink from './components/AccessLink';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check for token if its not expired login user
  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      const expiryDate = parseInt(decoded.exp);
      if (Date.now > expiryDate) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div
      className='col-12'
      style={{
        padding: '20px 40px',
      }}>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ marginTop: '50px' }}>
        <Switch>
          <Route
            exact
            path='/login'
            render={() =>
              isLoggedIn ? (
                <Redirect to='/folders' />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            exact
            path='/register'
            render={() =>
              isLoggedIn ? <Redirect to='/folders' /> : <Register />
            }
          />
          <Route
            exact
            path='/folders'
            render={() => (isLoggedIn ? <Folders /> : <Redirect to='/login' />)}
          />
          <Route
            exact
            path='/files'
            render={() => (isLoggedIn ? <Files /> : <Redirect to='/login' />)}
          />
          <Route
            exact
            path='/links'
            render={() => (isLoggedIn ? <Links /> : <Redirect to='/login' />)}
          />
          <Route exact path='/accessfile' component={AccessLink} />
          <Route
            exact
            path='*'
            render={() => (isLoggedIn ? <Folders /> : <Redirect to='/login' />)}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
