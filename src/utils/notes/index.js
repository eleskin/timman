import axios from 'axios';
import {getToken} from '../auth';
import store from '../../store/store';

export const create = () => {
  return (async () => {
    const response = await axios.post('http://127.0.0.1:8000/api/notes', {
      user_id: store.getState().authReducer.id,
      value: ''
    }, {
      headers: {
        Authorization: getToken()
      }
    });

    return response.status === 201 ? {note: response.data.note} : false;
  })();
};

export const getNotes = () => {
  return (async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/notes', {
      headers: {
        Authorization: getToken(),
        'user-id': store.getState().authReducer.id
      }
    });

    return response.status === 200 ? {notes: [...response.data]} : false;
  })();
};

export const getNoteValue = id => {
  return (async id => {
    const response = await axios.get(`http://127.0.0.1:8000/api/notes/${id}`, {
      headers: {
        Authorization: getToken()
      }
    });

    return response.status === 200 ? {
      value: response.data.value,
      id: response.data.id
    } : false;
  })(id);
};

export const save = (id, value) => {
  return (async (id, value) => {
    const response = await axios.put(`http://127.0.0.1:8000/api/notes`, {
      id,
      value,
    }, {
      headers: {
        Authorization: getToken()
      }
    });

    return response.status === 201 ? {
      value: response.data.value,
      id: response.data.id
    } : false;
  })(id, value);
};

export const remove = id => {
  return (async id => {
    const response = await axios.delete(`http://127.0.0.1:8000/api/notes/${id}`, {
      headers: {
        Authorization: getToken()
      }
    });

    return response.status === 200 ? {
      id: Number(response.data.id)
    } : false;
  })(id);
};

export const clear = () => (async () => true)();
