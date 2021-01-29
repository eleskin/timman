const ADD_TASK = 'ADD_TASK';
const SET_TASKS = 'SET_TASKS';

const initialState = {
  tasks: []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {...state, tasks: [action.task, ...state.tasks]};
    case SET_TASKS:
      return {...state, tasks: [...action.tasks]};
    default:
      return state;
  }
};

export default todoReducer;