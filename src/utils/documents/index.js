import axios from 'axios';
import {getToken} from '../auth/index';
import store from '../../store/store';

export const upload = (data) => {
  return (async (data) => {
    const formData = new FormData();

    formData.set('user_id', store.getState().authReducer.id);
    formData.set('file_name', data.name);
    formData.append(
      'file',
      data,
      data.name
    );

    const response = await axios.post('http://127.0.0.1:8000/api/documents', formData, {
      headers: {
        Authorization: getToken()
      }
    });

    return response.status === 201 ? {documents: [response.data.document], size: response.data.size.toFixed(2)} : false;
  })(data);
};

export const getFiles = () => {
  return (async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/documents', {
      headers: {
        Authorization: getToken(),
        'user-id': store.getState().authReducer.id
      }
    });

    return response.status === 200 ? {documents: [...response.data.documents], size: response.data.size.toFixed(2)} : false;
  })();
};

export const download = (data) => {
  return (async (data) => {
    const response = await axios
      .get(`http://127.0.0.1:8000/api/documents/${data.index}`, {
        headers: {
          Authorization: getToken()
        },
        responseType: 'blob'
      });

    return response.status === 200 ? response : false;
  })(data);
};

export const remove = (index) => {
  return (async (index) => {
    const response = await axios
      .delete(`http://127.0.0.1:8000/api/documents/${index}`, {
        headers: {
          Authorization: getToken(),
          'user-id': store.getState().authReducer.id
        }
      });

    return response.status === 200 ? {index: Number(response.data.id), size: response.data.size.toFixed(2)} : false;
  })(index);
};

export const clear = () => (async () => true)();

export const share = (id) => {
  return (async (id) => {
    const response = await axios
      .post(`http://127.0.0.1:8000/api/documents/share`, {
        user_id: store.getState().authReducer.id,
        id,
      }, {
        headers: {
          Authorization: getToken(),
        }
      });

    return response.status === 200 ? response.data : false;
  })(id);
};

export const getShareDocument = (id) => {
  return (async (id) => {
    const response = await axios
      .get(`http://127.0.0.1:8000/api/documents/share/${id}`);

    return response.status === 200 ? {document: response.data} : false;
  })(id);
};

export const downloadShareDocument = (hash) => {
  return (async (hash) => {
    const response = await axios
      .get(`http://127.0.0.1:8000/api/documents/share/download/${hash}`, {
        responseType: 'blob'
      });

    return response.status === 200 ? response : false;
  })(hash);
};
