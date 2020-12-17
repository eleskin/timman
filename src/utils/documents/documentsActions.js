import {upload} from './index';

const documentsActions = {
  upload: (data) => {
    upload(data);
    return({type: ''});
    // return upload().then(() => ({type: 'LOG_IN'})).catch(() => ({type: 'LOG_OUT'}));
  }
};

export default documentsActions;