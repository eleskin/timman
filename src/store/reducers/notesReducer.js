const ADD_NOTE = 'ADD_NOTE';
const SET_NOTES = 'SET_NOTES';

const initialState = {
  notes: []
};

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {...state, notes: [...state.notes, action.note]};
    case SET_NOTES:
      return {...state, notes: [...action.notes]};
    default:
      return state;
  }
};

export default documentsReducer;