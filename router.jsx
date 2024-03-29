import React from 'react';

import { HashRouter as Router, BrowserRouter, Redirect, withRouter } from 'react-router-dom';

import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import store from './src/store';

import DashBoard from './src/components/App';

import Detail from './src/components/childComponents/AnimeDetailPage';

import Login from './src/components/Login';

import Register from './src/components/Register';

const BasicRoute = props => (
  <Router history={BrowserRouter}>
    <CacheSwitch>
      <CacheRoute
        exact
        path="/"
        component={() => (store.getState().get('isLogin') ? <Redirect to="/" /> : <Login />)}
      />
      <CacheRoute
        exact
        path="/login"
        component={() => (store.getState().get('isLogin') ? <DashBoard /> : <Redirect to="/" />)}
      />
      <CacheRoute exact path="/register" component={Register} />
      <CacheRoute exact path="/detail/:id" component={Detail} />
    </CacheSwitch>
  </Router>
);

export default withRouter(BasicRoute);
