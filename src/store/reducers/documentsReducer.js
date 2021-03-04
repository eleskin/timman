const ADD_FILES = 'ADD_FILES';
const SET_FILES = 'SET_FILES';
const REMOVE_FILE = 'REMOVE_FILE';
const CLEAR_FILES = 'CLEAR_FILES';
const SET_FILE = 'SET_FILE';
const NULL_FILE = 'NULL_FILE';

const initialState = {
  isDocument: true,
  document: null,
  documents: [],
  size: null
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
    case SET_FILE:
      return {...state, document: action.document};
    case NULL_FILE:
      return {...state, isDocument: false};
    default:
      return state;
  }
};

export default documentsReducer;
