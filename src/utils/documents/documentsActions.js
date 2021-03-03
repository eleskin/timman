import {upload, getFiles, download, remove, clear, share, getShareDocument} from './index';

const documentsActions = {
  upload: data => upload(data).then(({documents, size}) => ({type: 'ADD_FILES', documents, size})),
  getFiles: () => getFiles().then(({documents, size}) => ({type: 'SET_FILES', documents, size})),
  download: data => {
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
  remove: index => remove(index).then(({index, size}) => ({type: 'REMOVE_FILE', index, size})),
  clear: () => clear().then(() => ({type: 'CLEAR_FILES'})),
  share: (id) => share(id),
  getShareDocument: (id) => getShareDocument(id)
};

export default documentsActions;
