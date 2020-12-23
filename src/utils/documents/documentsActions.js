import {upload, getFiles, download, remove} from './index';

const documentsActions = {
  upload: (data) => {
    return upload(data).then(({documents}) => ({type: 'ADD_FILES', documents: documents})).catch(() => ({type: ''}));
  },
  getFiles: () => {
    return getFiles().then(({documents}) => ({type: 'SET_FILES', documents: documents})).catch(() => ({type: ''}));
  },
  download: (index) => {
    return download(index)
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();

        return {type: ''};
      })
      .catch(() => ({type: ''}));
  },
  remove: (index) => {
    return remove(index).then(({index}) => ({type: 'REMOVE_FILE', index: index})).catch(() => ({type: ''}));
  }
};

export default documentsActions;