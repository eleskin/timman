import React, {useState} from 'react';
import {Button, Col, Input, Row} from 'antd';
import {connect} from 'react-redux';
import todoActions from '../../utils/todo/todoActions';

const TodoList = props => {
  const [taskValue, setTaskValue] = useState('');

  const handleChange = event => {
    setTaskValue(event.target.value);
  };

  const handleClick = () => {
    taskValue && props.save(taskValue);
  };

  return (
    <div>
      <Row justify="center">
        <Col md={10}>
          <Input placeholder="Add task" value={taskValue} onChange={handleChange}/>
        </Col>
        <Col md={2}>
          <Button type="primary" onClick={handleClick}>Add</Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col md={12}>
          <ul>
            {/*<li><Checkbox/></li>*/}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  null,
  dispatch => ({
    save: value => todoActions.save(value).then(result => dispatch(result))
  })
)(TodoList);