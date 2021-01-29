import {save, getTasks, setSuccess} from './index';

const todoActions = {
  save: value => save(value).then(({task}) => ({type: 'ADD_TASK', task})),
  getTasks: () => getTasks().then(({tasks}) => ({type: 'SET_TASKS', tasks})),
  setSuccess: (id, index, value) => setSuccess(id, value).then(({task}) => ({type: 'SET_TASK', task, index})),
};

export default todoActions;