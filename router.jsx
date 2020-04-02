import React from 'react';

import { HashRouter as Router, Route, BrowserRouter, Redirect } from 'react-router-dom';

import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import store from './src/store';

import DashBoard from './src/components/App';

import Detail from './src/components/childComponents/AnimeDetailPage';

import Login from './src/components/Login';

import Register from './src/components/Register';

// class Routers extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = store.getState();
//     this.handleLogin = this.handleLogin.bind(this);
//     store.subscribe(this.handleLogin);
//   }

//   handleLogin() {
//     console.log('store changed');
//   }

//   render() {
//     return (
//       <Router history={BrowserRouter}>
//         <CacheSwitch>
//           <CacheRoute
//             history={BrowserRouter}
//             exact
//             path="/"
//             component={() => (this.state.get('isLogin') ? <DashBoard /> : <Redirect to="/login" />)}
//           />
//           <CacheRoute exact path="/register" component={Register} />
//           <CacheRoute
//             history={BrowserRouter}
//             exact
//             path="/login"
//             component={() => (this.state.get('isLogin') ? <Redirect to="/" /> : <Login />)}
//           />
//           <CacheRoute
//             history={BrowserRouter}
//             exact
//             path="/detail/:id"
//             component={() => (this.state.get('isLogin') ? <Detail /> : <Redirect to="/login" />)}
//           />
//         </CacheSwitch>
//       </Router>
//     );
//   }
// }

// export default Routers;

const BasicRoute = props => (
  <Router history={BrowserRouter}>
    <CacheSwitch>
      <CacheRoute
        exact
        path="/login"
        component={() => (store.getState().get('isLogin') ? <Redirect to="/" /> : <Login />)}
      />
      <CacheRoute exact path="/register" component={Register} />
      <CacheRoute exact path="/" component={DashBoard} />
      <CacheRoute exact path="/detail/:id" component={Detail} />
    </CacheSwitch>
  </Router>
);

export default BasicRoute;
