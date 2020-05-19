import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import FriendsList from './components/FriendsList'

function App() {
  return (
    <div className="App">
        <Switch>
          <PrivateRoute exact path='/friendslist' component={FriendsList} />
          <Route exact path='/login' component={Login} />
          <Route component={Login} />
        </Switch>
    </div>
  );
}

export default App;
