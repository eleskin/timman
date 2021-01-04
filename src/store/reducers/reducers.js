import {combineReducers} from 'redux';
import authReducer from './authReducer';
import documentsReducer from './documentsReducer';
import notesReducer from './notesReducer';

const reducers = combineReducers({
  authReducer,
  documentsReducer,
  notesReducer
});

export default reducers;