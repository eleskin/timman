import {authRegister, authLogin, authenticate, authLogout} from '../../utils/auth/';

const authActions = {
  authenticate: () => {
    return authenticate().then(() => ({type: 'LOG_IN'})).catch(() => ({type: 'LOG_OUT'}));
  },
  register: (data) => {
    return authRegister(data).then(() => ({type: 'LOG_IN'})).catch(() => ({type: 'LOG_OUT'}));
  },
  login: (data) => {
    return authLogin(data).then(() => ({type: 'LOG_IN'})).catch(() => ({type: 'LOG_OUT'}));
  },
  logout: (data) => {
    return authLogout(data).then(() => ({type: 'LOG_OUT'})).catch(() => ({type: 'LOG_IN'}));
  }
};

export default authActions;