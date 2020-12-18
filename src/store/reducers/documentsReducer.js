const ADD_FILES = 'ADD_FILES';
const SET_FILES = 'SET_FILES';

const initialState = {
  documents: []
};

const documentsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_FILES:
      return {...state, documents: [...state.documents, ...action.documents]}
    case SET_FILES:
      return {...state, documents: [...action.documents]}
    default:
      return state;
  }
};

export default documentsReducer;