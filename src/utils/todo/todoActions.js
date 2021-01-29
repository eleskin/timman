import {save} from './index';

const todoActions = {
  save: value => save(value).then(({task}) => ({type: 'ADD_TASK', task}))
};

export default todoActions;