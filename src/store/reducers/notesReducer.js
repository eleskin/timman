const ADD_NOTE = 'ADD_NOTE';
const SET_NOTES = 'SET_NOTES';
const SET_NOTE_VALUE = 'SET_NOTE_VALUE';

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
    case SET_NOTE_VALUE:
      return {...state, noteValue: action.value};
    default:
      return state;
  }
};

export default documentsReducer;