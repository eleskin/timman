import React from 'react';
import {Redirect} from 'react-router-dom';

const NullRoute = ({component: Component, auth, ...rest}) => {
  if (auth === null) return null;
  return auth
    ? <Redirect to={{pathname: '/', state: {from: rest.location.pathname}}}/>
    : <Redirect to={{pathname: '/login', state: {from: rest.location.pathname}}}/>;
};

export default NullRoute;