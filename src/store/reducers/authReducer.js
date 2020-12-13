const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

const initialState = {
  auth: false
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOG_IN:
      return {...state, auth: true}
    case LOG_OUT:
      return {...state, auth: false}
    default:
      return state;
  }
};

export default authReducer;