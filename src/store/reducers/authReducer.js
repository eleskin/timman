const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const SET_ID = 'SET_ID';

const initialState = {
  auth: null
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOG_IN:
      return {...state, auth: true}
    case LOG_OUT:
      return {...state, auth: false}
    case SET_ID:
      return {...state, id: action.id}
    default:
      return state;
  }
};

export default authReducer;