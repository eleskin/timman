import {save, getTasks, update, remove, changeOrder} from './index';

const todoActions = {
  save: (value, order) => save(value, order).then(({task}) => ({type: 'ADD_TASK', task})),
  getTasks: () => getTasks().then(({tasks}) => ({type: 'SET_TASKS', tasks})),
  update: (id, index, value, valueSuccess) => update(id, value, valueSuccess)
    .then(({task}) => ({type: 'SET_TASK', task, index})),
  remove: id => remove(id).then(({id}) => ({type: 'REMOVE_TASK', id})),
  changeOrder: (taskA, taskB) => changeOrder(taskA, taskB).then(({tasks}) => ({type: 'CHANGE_ORDER', tasks})),
};

export default todoActions;
