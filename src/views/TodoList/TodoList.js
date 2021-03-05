import React from 'react';
import TodoListForm from './components/TodoListForm/TodoListForm';
import TodoListTasks from './components/TodoListTasks/TodoListTasks';

const TodoList = () => {
  return (
    <div>
      <TodoListForm/>
      <TodoListTasks/>
    </div>
  );
};

export default TodoList;
