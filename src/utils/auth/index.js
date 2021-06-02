import axios from 'axios';
import store from '../../store/store';

const removeToken = () => {
  localStorage.clear();
};

const setToken = token => {
  const {access_token, expires_at, token_type} = token;

  removeToken();

  localStorage.setItem('access_token', access_token);
  localStorage.setItem('expires_at', expires_at);
  localStorage.setItem('token_type', token_type);
};

export const getToken = () => `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`;

export const authenticate = () => {
  return (async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/user', {
      headers: {
        Authorization: getToken()
      }
    });

    return response.status === 200 ? {id: response.data.id, name: response.data.name} : false;

  })();
};

export const register = data => {
  return (async data => {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/register', data);

    if (response.status === 200) {
      setToken(response.data);

      return  {id: response.data.id, name: response.data.name};
    }
    return false;
  })(data);
};

export const login = data => {
  return (async data => {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login', data);

    if (response.status === 200) {
      setToken(response.data);

      return  {id: response.data.id, name: response.data.name};
    }
    return false;
  })(data);
};

export const logout = () => {
  return (async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/logout', {
      headers: {
        Authorization: getToken()
      }
    });

    if (response.status === 200) {
      removeToken(response.data);

      return true;
    }
    return false;
  })();
};

export const getName = () => store.getState();
