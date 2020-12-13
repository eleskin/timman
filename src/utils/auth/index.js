import axios from 'axios';

export const authRegister = (data) => {
  const [name, email, password] = data;

  return axios
    .post('http://127.0.0.1:8000/api/auth/register', {
      name,
      email,
      password
    })
    .then(response => response.status === 201)
    .catch(response => false);
};

export const authLogin = (data) => {
  const [email, password] = data;

  return axios
    .post('http://127.0.0.1:8000/api/auth/login', {
      email,
      password
    })
    .then(response => response.status === 200)
    .catch(response => false);
};