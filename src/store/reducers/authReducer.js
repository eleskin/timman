const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

const initialState = {
  auth: null,
  id: null
};

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOG_IN:
      return {...state, auth: true, id: action.id}
    case LOG_OUT:
      return {...state, auth: false}
    default:
      return state;
  }
};

export default authReducer;