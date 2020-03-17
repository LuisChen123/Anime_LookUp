import React from 'react';

import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom';

import App from './src/components/App';

import Detail from './src/components/childComponents/AnimeDetailPage';

const BasicRoute = () => (
  <HashRouter history={BrowserRouter}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/detail/:id" component={Detail} />
    </Switch>
  </HashRouter>
);

export default BasicRoute;
