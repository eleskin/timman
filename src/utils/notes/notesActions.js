import {create, getNotes, getNoteValue, save} from './index';

const notesActions = {
  create: () => create().then(({note}) => ({type: 'ADD_NOTE', note})),
  getNotes: () => getNotes().then(({notes}) => ({type: 'SET_NOTES', notes})),
  getNoteValue: id => getNoteValue(id).then(({id, value, title}) => ({type: 'SET_NOTE', id, value, title})),
  save: (id, value, title) => save(id, value, title).then(({id, value, title}) => ({type: 'SET_NOTE', id, value, title}))
};

export default notesActions;