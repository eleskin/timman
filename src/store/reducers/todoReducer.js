const ADD_TASK = 'ADD_TASK';

const initialState = {
  tasks: []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {...state, tasks: [...state.tasks, ...action.task]};
    default:
      return state;
  }
};

export default todoReducer;