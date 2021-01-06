import {create, getNotes, getNoteValue, save} from './index';

const notesActions = {
  create: () => create().then(({note}) => ({type: 'ADD_NOTE', note})),
  getNotes: () => getNotes().then(({notes}) => ({type: 'SET_NOTES', notes: notes})),
  getNoteValue: id => getNoteValue(id).then(value => ({type: 'SET_NOTE_VALUE', value})),
  save: (id, value) => save(id, value).then(value => ({type: 'SET_NOTE_VALUE', value}))
};

export default notesActions;