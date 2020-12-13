import {authRegister, authLogin} from '../../utils/auth/';

const authActions = {
  authentificate: () => {
    return {type: ' '}
  },
  register: (data) => {
    return authRegister(data).then(result => result).catch(result => result)
      ? {type: 'LOG_IN'}
      : {type: 'LOG_OUT'};
  },
  login: (data) => {
    return authLogin(data).then(result => result).catch(result => result)
     ? {type: 'LOG_IN'}
     : {type: 'LOG_OUT'};
  }
};

export default authActions;