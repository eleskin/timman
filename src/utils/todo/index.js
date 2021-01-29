import {getToken} from '../auth';
import store from '../../store/store';
import axios from 'axios';

export const save = value => {
  return (async value => {
    const response = await axios.post('http://127.0.0.1:8000/api/todo/', {
      user_id: store.getState().authReducer.id,
      value: value
    }, {
      headers: {
        Authorization: getToken()
      }
    });

    console.log(response);

    return response.status === 201 ? {note: response.data} : false;
  })(value);
};