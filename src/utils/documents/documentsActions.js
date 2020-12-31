import {upload, getFiles, download, remove, clear} from './index';

const documentsActions = {
  upload: (data) => {
    return upload(data).then(({documents}) => ({type: 'ADD_FILES', documents: documents}));
  },
  getFiles: () => {
    return getFiles().then(({documents}) => ({type: 'SET_FILES', documents: documents}));
  },
  download: (data) => {
    return download(data)
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', data.name);
        document.body.appendChild(link);
        link.click();
      });
  },
  remove: (index) => {
    return remove(index).then(({index}) => ({type: 'REMOVE_FILE', index: index}));
  },
  clear: () => {
    return clear().then(() => ({type: 'CLEAR_FILES'}));
  }
};

export default documentsActions;