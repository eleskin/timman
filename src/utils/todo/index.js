import {getToken} from '../auth';
import store from '../../store/store';
import axios from 'axios';

export const save = (value, order) => {
  return (async value => {
    const response = await axios.post('http://127.0.0.1:8000/api/todo', {
      user_id: store.getState().authReducer.id,
      value: value,
      order: order,
    }, {
      headers: {
        Authorization: getToken()
      }
    });

    return response.status === 201 ? {task: response.data.task} : false;
  })(value, order);
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

export const update = (id, value, valueSuccess) => {
  return (async (id, value, valueSuccess) => {
    const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}`, {
      valueSuccess,
      value
    }, {
      headers: {
        Authorization: getToken(),
      }
    });

    return response.status === 200 ? {task: response.data} : false;
  })(id, value, valueSuccess);
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

export const changeOrder = (taskA, taskB) => {
  return (async (taskA, taskB) => {
    const response = await axios.put('http://127.0.0.1:8000/api/todo/', {
      taskA,
      taskB
    }, {
      headers: {
        Authorization: getToken(),
        'user-id': store.getState().authReducer.id
      }
    });

    return response.status === 200 ? {tasks: response.data} : false;
  })(taskA, taskB);
};
