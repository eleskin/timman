import {upload, getFiles, download, remove, clear} from './index';

const documentsActions = {
  upload: (data) => {
    return upload(data).then(({documents}) => ({type: 'ADD_FILES', documents: documents}));
  },
  getFiles: () => {
    return getFiles().then(({documents}) => ({type: 'SET_FILES', documents: documents}));
  },
  download: (index) => {
    return download(index)
      .then(response => {
        const fileTypeArray = response.data.type.split('/');
        const extension = fileTypeArray[fileTypeArray.length - 1];

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `file.${extension}`);
        document.body.appendChild(link);
        link.click();

        return {type: ''};
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