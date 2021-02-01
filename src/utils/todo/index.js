import {getToken} from '../auth';
import store from '../../store/store';
import axios from 'axios';

export const save = value => {
  return (async value => {
    const response = await axios.post('http://127.0.0.1:8000/api/todo', {
      user_id: store.getState().authReducer.id,
      value: value
    }, {
      headers: {
        Authorization: getToken()
      }
    });

    return response.status === 201 ? {task: response.data.task} : false;
  })(value);
};

export const getTasks = () => {
  return (async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/todo', {
      headers: {
        Authorization: getToken(),
        'user-id': store.getState().authReducer.id
      }
    });

    return response.status === 200 ? {tasks: [...response.data]} : false;
  })();
};

export const setSuccess = (id, value) => {
  return (async (id, value) => {
    const response = await axios.put(`http://127.0.0.1:8000/api/todo/${id}`, {
      value,
    }, {
      headers: {
        Authorization: getToken(),
      }
    });

    return response.status === 200 ? {task: response.data} : false;
  })(id, value);
};

export const remove = id => {
  return (async id => {
    const response = await axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {
      headers: {
        Authorization: getToken(),
      }
    });

    return response.status === 200 ? {id: Number(response.data)} : false;
  })(id);
};