import axios from 'axios';

export const authRegister = (data) => {
  const register = async (data) => {
    const [name, email, password] = data;

    const response = await axios.post('http://127.0.0.1:8000/api/auth/register', {
      name, email, password
    });

    return response.status === 201;
  };

  return register(data);
};

export const authLogin = (data) => {
  const login = async (data) => {
    const [email, password] = data;

    const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
      email, password
    });

    return response.status === 200;
  };

  return login(data);
};