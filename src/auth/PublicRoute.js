import React from 'react';
import {Redirect} from 'react-router-dom';

const PublicRoute = ({component: Component, auth, ...rest}) => {
  return !auth
    ? <Component {...rest}/>
    : <Redirect to={{pathname: '/', state: {from: rest.location.pathname}}}/>;
};

export default PublicRoute;