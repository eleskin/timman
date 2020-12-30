import axios from 'axios';
import {getToken} from '../auth/index';
import store from '../../store/store';

export const upload = (data) => {
  return (async (data) => {
    const formData = new FormData();

    formData.set('user_id', store.getState().authReducer.id);
    formData.append(
      'file',
      data,
      data.name
    );

    const response = await axios.post('http://127.0.0.1:8000/api/documents/', formData, {
      headers: {
        Authorization: getToken()
      }
    });

    const title = response.data.document.title;
    response.data.document.title = title.split('/')[title.split('/').length - 1];

    return response.status === 201 ? {documents: [response.data.document]} : false;
  })(data);
};

export const getFiles = () => {
  return (async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/documents/', {
      headers: {
        Authorization: getToken(),
        user_id: store.getState().authReducer.id
      }
    });

    response.data.forEach(item => {
      const title = item.title.split('/');
      item.title = title[title.length - 1];
    });


    return response.status === 200 ? {documents: [...response.data]} : false;
  })();
};

export const download = (index) => {
  return (async (index) => {
    const response = await axios
      .get(`http://127.0.0.1:8000/api/documents/${index}`, {
        headers: {
          Authorization: getToken()
        },
        responseType: 'blob'
      });

    return response.status === 200 ? response : false;
  })(index);
};

export const remove = (index) => {
  return (async (index) => {
    const response = await axios
      .delete(`http://127.0.0.1:8000/api/documents/${index}`, {
        headers: {
          Authorization: getToken()
        }
      });

    return response.status === 200 ? {index: Number(response.data)} : false;
  })(index);
};

export const clear = () => {
  return (async () => true)();
};