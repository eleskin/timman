import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PublicRoute = ({component: Component, auth, ...rest}) => {
  if (auth === null) return null;
  return !auth
    ? <Route {...rest} children={<Component auth={auth}/>}/>
    : <Redirect to={{pathname: '/home', state: {from: rest.location.pathname}}}/>;
};

export default PublicRoute;