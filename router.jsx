import React from 'react';

import { HashRouter as Router, Route, BrowserRouter, Redirect } from 'react-router-dom';

import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import DashBoard from './src/components/App';

import Detail from './src/components/childComponents/AnimeDetailPage';

import NavBar from './src/components/NavBar';

import Login from './src/components/logIn';

import Register from './src/components/Register';

const loggedIn = true;

const BasicRoute = () => (
  <Router history={BrowserRouter}>
    <CacheSwitch>
      <CacheRoute exact path="/" component={DashBoard} />
      <Route exact path="/navBar" component={NavBar} />
      <CacheRoute exact path="/detail/:id" component={Detail} />
    </CacheSwitch>
  </Router>
);

export default BasicRoute;
