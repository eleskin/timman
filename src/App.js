import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PrivateRoute from './auth/PrivateRoute';
import PublicRoute from './auth/PublicRoute';
import NullRoute from './auth/NullRoute';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';

const App = (props) => {
  const {auth} = props;

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute auth={auth} exact path="/login" component={Login}/>
          <PublicRoute auth={auth} exact path="/register" component={Register}/>

          <PrivateRoute auth={auth} exact path="/" component={Home}/>
          <NullRoute auth={auth}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default connect(({authReducer}) => ({auth: authReducer.auth}), null)(App);
