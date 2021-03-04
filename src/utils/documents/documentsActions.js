import {upload, getFiles, download, remove, clear, share, getShareDocument, downloadShareDocument} from './index';

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
  getShareDocument: (id) => {
    return getShareDocument(id).then(({document}) => document).catch(() => ({type: 'NULL_FILE'}))
  },
  downloadShareDocument: (hash) => {
    return downloadShareDocument(hash)
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const splited = atob(hash).split('/');
        link.href = url;
        link.setAttribute('download', splited[splited.length - 1]);
        document.body.appendChild(link);
        link.click();
    });
  }
};

export default documentsActions;
