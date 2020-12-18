import {upload} from './index';

const documentsActions = {
  upload: (data) => {
    return upload(data).then(() => ({type: ''})).catch(() => ({type: ''}));
    // return upload().then(() => ({type: 'LOG_IN'})).catch(() => ({type: 'LOG_OUT'}));
  }
};

export default documentsActions;