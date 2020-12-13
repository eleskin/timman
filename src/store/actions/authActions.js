import {authRegister, authLogin} from '../../utils/auth/';

const authActions = {
  authentificate: () => {
    return {type: ' '}
  },
  register: (data) => {
    return authRegister(data).then(() => ({type: 'LOG_IN'})).catch(() => ({type: 'LOG_OUT'}));
  },
  login: (data) => {
    return authLogin(data).then(() => ({type: 'LOG_IN'})).catch(() => ({type: 'LOG_OUT'}));
  }
};

export default authActions;