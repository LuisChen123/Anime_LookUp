import React, { PureComponent } from 'react';

import { HashRouter as Router, Route, BrowserRouter, Redirect } from 'react-router-dom';

import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import store from './src/store';

import DashBoard from './src/components/App';

import Detail from './src/components/childComponents/AnimeDetailPage';

import NavBar from './src/components/NavBar';

import Login from './src/components/Login';

import Register from './src/components/Register';

class Routers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleLogin = this.handleLogin.bind(this);
    store.subscribe(this.handleLogin);
    console.log(this.state.get('isLogin'));
  }

  handleLogin() {
    console.log('store changed');
  }

  // auth() {

  //   return isLogin ? <DashBoard /> : <Redirect to="/login" />;
  // }

  render() {
    return (
      <Router history={BrowserRouter}>
        <CacheSwitch>
          <CacheRoute
            exact
            path="/"
            component={() => (this.state.get('isLogin') ? <DashBoard /> : <Redirect to="/login" />)}
          />
          <CacheRoute exact path="/register" component={Register} />
          <CacheRoute exact path="/login" component={Login} />
          <CacheRoute exact path="/detail/:id" component={Detail} />
        </CacheSwitch>
      </Router>
    );
  }
}

export default Routers;
