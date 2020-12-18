import {combineReducers} from 'redux';
import authReducer from './authReducer';
import documentsReducer from './documentsReducer';

const reducers = combineReducers({
  authReducer,
  documentsReducer
});

export default reducers;