import {register, login, authenticate, logout, getName} from './index';

const authActions = {
  authenticate: () => {
    return authenticate().then(({id, name}) => ({type: 'LOG_IN', id: id, name: name})).catch(() => ({type: 'LOG_OUT'}));
  },
  register: (data) => {
    return register(data).then(({id, name}) => ({type: 'LOG_IN', id: id, name: name}));
  },
  login: (data) => {
    return login(data).then(({id, name}) => ({type: 'LOG_IN', id: id, name: name}));
  },
  logout: (data) => {
    return logout(data).then(() => ({type: 'LOG_OUT'}));
  },
  getName: () => {
    return getName();
  }
};

export default authActions;