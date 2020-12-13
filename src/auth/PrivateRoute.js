import React from 'react';
import {Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, auth, ...rest}) => {
  if (auth === null) return null;
  return auth
    ? <Component {...rest}/>
    : <Redirect to={{pathname: '/login', state: {from: rest.location.pathname}}}/>;
};

export default PrivateRoute;