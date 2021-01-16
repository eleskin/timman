import axios from 'axios';
import {getToken} from '../auth';
import store from '../../store/store';

export const create = () => {
  return (async () => {
    const response = await axios.post('http://127.0.0.1:8000/api/notes/', {
      user_id: store.getState().authReducer.id,
      title: '',
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
    const response = await axios.get('http://127.0.0.1:8000/api/notes/', {
      headers: {
        Authorization: getToken(),
        user_id: store.getState().authReducer.id
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
      title: response.data.title,
      value: response.data.value,
      id: response.data.id
    } : false;
  })(id);
};

export const save = (id, value, title) => {
  return (async (id, value, title) => {
    const response = await axios.put(`http://127.0.0.1:8000/api/notes/`, {
      id,
      value,
      title
    }, {
      headers: {
        Authorization: getToken()
      }
    });

    return response.status === 201 ? {
      title: response.data.title,
      value: response.data.value,
      id: response.data.id
    } : false;
  })(id, value, title);
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