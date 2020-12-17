import axios from 'axios';
import {getToken} from '../auth/index'

export const upload = (data) => {
  return (async (data) => {
    const formData = new FormData();

    formData.append(
      'file',
      data.file,
      data.file.name
    );

    const response = await axios.post('http://127.0.0.1:8000/api/documents/', formData, {
      headers: {
        Authorization: getToken()
      }
    });

    console.log(response)

    return true;
  })(data);
};