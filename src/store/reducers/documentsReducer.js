const ADD_FILES = 'ADD_FILES';
const SET_FILES = 'SET_FILES';
const REMOVE_FILE = 'REMOVE_FILE';
const CLEAR_FILES = 'CLEAR_FILES';

const initialState = {
  documents: []
};

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILES:
      return {...state, documents: [...state.documents, ...action.documents], size: action.size};
    case SET_FILES:
      return {...state, documents: [...action.documents], size: action.size};
    case REMOVE_FILE:
      return {...state, documents: [...state.documents.filter(item => item.id !== action.index)], size: action.size};
    case CLEAR_FILES:
      return state;
    default:
      return state;
  }
};

export default documentsReducer;