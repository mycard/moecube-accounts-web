import React from 'react';
import { Router, Route, Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Login from "./routes/Login.js";

import Forgot from "./routes/Forgot.js";

import Register from "./routes/Register.js";

import Reset from "./routes/Reset.js";

import Profiles from "./routes/Profiles.js";

import Active from "./routes/Activate.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Redirect from="/" to="/login"/>
      <Route path="/">
        <Route path="/login" component={Login} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/register" component={Register} />
        <Route path="/reset" component={Reset} />
        <Route path="/profiles" component={Profiles} />
      </Route>
      <Route path="/activate" component={Active} />
    </Router>
  );
}

export default RouterConfig;
