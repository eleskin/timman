import {create, getNotes, getNoteValue} from './index';

const notesActions = {
  create: () => create().then(({note}) => ({type: 'ADD_NOTE', note})),
  getNotes: () => getNotes().then(({notes}) => ({type: 'SET_NOTES', notes: notes})),
  getNoteValue: id => getNoteValue(id).then(value => ({type: 'SET_NOTE_VALUE', value}))
};

export default notesActions;