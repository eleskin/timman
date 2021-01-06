const ADD_NOTE = 'ADD_NOTE';
const SET_NOTES = 'SET_NOTES';
const SET_NOTE = 'SET_NOTE';

const initialState = {
  notes: [],
  noteValue: ''
};

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {...state, notes: [...state.notes, action.note]};
    case SET_NOTES:
      return {...state, notes: [...action.notes]};
    case SET_NOTE:
      state.notes.filter(note => note.id === action.id)[0].title = action.title;
      state.notes.filter(note => note.id === action.id)[0].value = action.value;
      return {...state, noteValue: action.value, noteTitle: action.title};
    default:
      return state;
  }
};

export default documentsReducer;