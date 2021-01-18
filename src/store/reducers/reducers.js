import {combineReducers} from 'redux';
import authReducer from './authReducer';
import documentsReducer from './documentsReducer';
import notesReducer from './notesReducer';

const reducers = combineReducers({
  authReducer,
  documentsReducer,
  notesReducer
});
const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducer;