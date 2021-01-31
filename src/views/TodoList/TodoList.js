import React, {useState, useEffect} from 'react';
import {Button, Card, Checkbox, Col, Input, Row} from 'antd';
import {connect} from 'react-redux';
import todoActions from '../../utils/todo/todoActions';
import {DeleteOutlined} from '@ant-design/icons';

const TodoList = props => {
  const [taskValue, setTaskValue] = useState('');

  const handleChange = event => {
    setTaskValue(event.target.value);
  };

  const handleClick = () => {
    taskValue && props.save(taskValue);
    setTaskValue('');
  };

  const handleCheck = (id, index, event) => {
    props.setSuccess(id, index, event.target.checked);
  };

  const handleDelete = id => {
    props.remove(id);
  };

  const getTasks = props.getTasks;
  useEffect(getTasks, [getTasks]);

  const tasksList = props.tasks.map((task, index) => (
    <li key={index}>
      <Card
        title={
          <Checkbox onChange={handleCheck.bind(this, task.id, index)} checked={task.success}>
            {task.value}
          </Checkbox>
        }
        extra={
          <Button type="primary" danger onClick={handleDelete.bind(this, task.id)}>
            <DeleteOutlined/>
          </Button>
        }
        key={index}
        bodyStyle={{display: 'none'}}
      />
    </li>
  ));

  return (
    <div>
      <Row justify="center">
        <Col md={10}>
          <Input placeholder="Add task" value={taskValue} onChange={handleChange} onPressEnter={handleClick}/>
        </Col>
        <Col md={2}>
          <Button type="primary" onClick={handleClick} style={{width: '100%'}}>Add</Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col md={12}>
          <ul style={{listStyle: 'none', padding: 0}}>
            {tasksList}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  state => {
    const {tasks} = state.todoReducer;

    return {tasks};
  },
  dispatch => ({
    save: value => todoActions.save(value).then(result => dispatch(result)),
    getTasks: () => todoActions.getTasks().then(result => dispatch(result)),
    setSuccess: (id, index, value) => todoActions.setSuccess(id, index, value).then(result => dispatch(result)),
    remove: id => todoActions.remove(id).then(result => dispatch(result))
  })
)(TodoList);