import {combineReducers} from 'redux';
import authReducer from './authReducer';
import documentsReducer from './documentsReducer';
import notesReducer from './notesReducer';
import todoReducer from './todoReducer';

const reducers = combineReducers({
  authReducer,
  documentsReducer,
  notesReducer,
  todoReducer
});
const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducer;