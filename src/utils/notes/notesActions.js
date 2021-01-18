import {create, getNotes, getNoteValue, save, remove, clear} from './index';

const notesActions = {
  create: () => create().then(({note}) => ({type: 'ADD_NOTE', note})),
  getNotes: () => getNotes().then(({notes}) => ({type: 'SET_NOTES', notes})),
  getNoteValue: id => getNoteValue(id).then(({id, value, title}) => ({type: 'SET_NOTE', id, value, title})),
  save: (id, value, title) => save(id, value, title).then(({id, value, title}) => ({
    type: 'SET_NOTE',
    id,
    value,
    title
  })),
  remove: id => remove(id).then(({id}) => ({type: 'REMOVE_NOTE', id})),
  clear: () => clear().then(() => ({type: 'CLEAR_NOTES'}))
};

export default notesActions;