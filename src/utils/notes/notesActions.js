import {create, getNotes} from './index';

const notesActions = {
  create: () => create().then(({note}) => ({type: 'ADD_NOTE', note})),
  getNotes: () => getNotes().then(({notes}) => ({type: 'SET_NOTES', notes: notes})),
};

export default notesActions;