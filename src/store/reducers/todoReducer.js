const ADD_TASK = 'ADD_TASK';
const SET_TASKS = 'SET_TASKS';
const SET_TASK = 'SET_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const CHANGE_ORDER = 'CHANGE_ORDER';

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
      const tasks = state.tasks.map((task) => {
        if (task.id === action.task.id) {
          task.success = action.task.success;
          task.value = action.task.value;
        }
        return task;
      });
      return {...state, tasks: [...tasks]};
    case REMOVE_TASK:
      return {...state, tasks: [...state.tasks.filter(item => item.id !== action.id)]};
    case CHANGE_ORDER:
      return {...state, tasks: [...action.tasks]};
    default:
      return state;
  }
};

export default todoReducer;
