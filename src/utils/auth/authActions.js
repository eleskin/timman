import {register, login, authenticate, logout} from './index';

const authActions = {
  authenticate: () => {
    return authenticate().then(() => ({type: 'LOG_IN'})).catch(() => ({type: 'LOG_OUT'}));
  },
  register: (data) => {
    return register(data).then(() => ({type: 'LOG_IN'})).catch(() => ({type: 'LOG_OUT'}));
  },
  login: (data) => {
    return login(data).then(() => ({type: 'LOG_IN'})).catch(() => ({type: 'LOG_OUT'}));
  },
  logout: (data) => {
    return logout(data).then(() => ({type: 'LOG_OUT'})).catch(() => ({type: 'LOG_IN'}));
  }
};

export default authActions;