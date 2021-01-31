const ADD_TASK = 'ADD_TASK';
const SET_TASKS = 'SET_TASKS';
const SET_TASK = 'SET_TASK';
const REMOVE_TASK = 'REMOVE_TASK';

const initialState = {
  tasks: []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {...state, tasks: [action.task, ...state.tasks]};
    case SET_TASKS:
      return {...state, tasks: [...action.tasks]};
    case SET_TASK:
      state.tasks[action.index].success = action.task.success;
      return {...state, tasks: [...state.tasks]};
    case REMOVE_TASK:
      return {...state, tasks: [...state.tasks.filter(item => item.id !== action.id)]};
    default:
      return state;
  }
};

export default todoReducer;