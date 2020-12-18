import {upload, getFiles} from './index';

const documentsActions = {
  upload: (data) => {
    return upload(data).then(({documents}) => ({type: 'ADD_FILES', documents: documents})).catch(() => ({type: ''}));
  },
  getFiles: () => {
    return getFiles().then(({documents}) => ({type: 'SET_FILES', documents: documents})).catch(() => ({type: ''}));
  }
};

export default documentsActions;