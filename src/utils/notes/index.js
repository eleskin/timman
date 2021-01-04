import axios from 'axios';
import {getToken} from '../auth';
import store from '../../store/store';

export const create = () => {
  return (async () => {
    const response = await axios.post('http://127.0.0.1:8000/api/notes/', {
      user_id: store.getState().authReducer.id,
      title: '1',
      value: '1'
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