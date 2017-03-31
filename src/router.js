import { Redirect, Route, Router } from 'dva/router';
import React from 'react';

import Active from './routes/Activate.js';

import Forgot from './routes/Forgot.js';

import Login from './routes/Login.js';

import Profiles from './routes/Profiles.js';

import Register from './routes/Register.js';

import Reset from './routes/Reset.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Redirect from="/" to="/login"/>
      <Route path="/">
        <Route path="/login" component={Login}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/register" component={Register}/>
        <Route path="/reset" component={Reset}/>
        <Route path="/profiles" component={Profiles}/>
      </Route>
      <Route path="/activate" component={Active}/>
    </Router>
  );
}

export default RouterConfig;
