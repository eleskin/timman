import React from 'react';
import {Redirect} from 'react-router-dom';

const PublicRoute = ({component: Component, auth, ...rest}) => {
  if (auth === null) return null;
  return !auth
    ? <Component {...rest}/>
    : <Redirect to={{pathname: '/home', state: {from: rest.location.pathname}}}/>;
};

export default PublicRoute;