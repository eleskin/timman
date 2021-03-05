import React, {useState} from 'react';
import {Button, Col, Input, Row} from 'antd';
import {connect} from 'react-redux';
import todoActions from '../../../../utils/todo/todoActions';

const TodoListForm = ({save, tasks}) => {
  const [taskValue, setTaskValue] = useState('');

  const handleChange = event => {
    setTaskValue(event.target.value);
  };

  const handleClick = () => {
    taskValue && save(taskValue, tasks.length);
    setTaskValue('');
  };

  return (
    <Row justify="center">
      <Col
        md={{span: 10}}
        sm={{span: 17}}
        xs={{span: 18}}
      >
        <Input placeholder="Add task" value={taskValue} onChange={handleChange} onPressEnter={handleClick}/>
      </Col>
      <Col
        md={{span: 2}}
        sm={{span: 3}}
        xs={{span: 6}}
      >
        <Button type="primary" onClick={handleClick} style={{width: '100%'}}>Add</Button>
      </Col>
    </Row>
  );
};

export default connect(
  state => {
    const {tasks} = state.todoReducer;

    return {tasks};
  },
  dispatch => ({
    save: (value, order) => todoActions.save(value, order).then(result => dispatch(result)),
  })
)(TodoListForm);
