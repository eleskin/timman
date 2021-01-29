import {save, getTasks} from './index';

const todoActions = {
  save: value => save(value).then(({task}) => ({type: 'ADD_TASK', task})),
  getTasks: () => getTasks().then(({tasks}) => ({type: 'SET_TASKS', tasks})),
};

export default todoActions;