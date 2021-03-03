import React, {useState, useEffect} from 'react';
import {Button, Card, Checkbox, Col, Input, Row} from 'antd';
import {connect} from 'react-redux';
import todoActions from '../../utils/todo/todoActions';
import {DeleteOutlined, DragOutlined, EditOutlined, SaveOutlined} from '@ant-design/icons';

const TodoList = ({getTasks, remove, save, update, tasks, changeOrder}) => {
  const [taskValue, setTaskValue] = useState('');

  useEffect(getTasks, [getTasks]);

  const handleChange = event => {
    setTaskValue(event.target.value);
  };

  const handleClick = () => {
    taskValue && save(taskValue, tasks.length);
    setTaskValue('');
  };


  const [editTaskId, setEditTaskId] = useState(null);
  const [editValue, setEditValue] = useState(null);

  const handleCheck = (id, index, value, checked) => {
    update(id, index, value, checked);
    setEditTaskId(null);
    setEditValue(null);
  };

  const handleDelete = id => {
    remove(id);
  };

  const getChangeTasks = (listA, listB) => {
    if (listA.length !== listB.length) return {};
    return listA.filter((item, i) => item !== listB[i] && item);
  };

  const handleChangeOrder = (tasksList) => {
    changeOrder(getChangeTasks(tasks, tasksList)[0], getChangeTasks(tasks, tasksList)[1]);
  };

  const [currentCard, setCurrentCard] = useState(null);

  const handleDragStart = (event, task) => {
    setCurrentCard(task);
  };

  const handleDragLeave = () => {};

  const handleDragEnd = () => {
    setCurrentCard(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, task) => {
    event.preventDefault();
    handleChangeOrder(tasks.map((taskItem) => {
      if (taskItem.id === task.id) {
        return {...taskItem, order: currentCard.order};
      }
      if (taskItem.id === currentCard.id) {
        return {...taskItem, order: task.order};
      }
      return taskItem;
    }));
    setCurrentCard(null);
  };

  const sortTasks = (cardA, cardB) => {
    return cardA.order > cardB.order ? 1 : -1;
  };

  const handleChangeItem = (id, value) => {
    setEditTaskId(id);
    setEditValue(value);
  };

  const tasksListItems = tasks.sort(sortTasks).map((task, index) => (
    <li
      key={index}
      style={{position: 'relative'}}
      draggable={true}
      onDragStart={(event) => handleDragStart(event, task)}
      onDragLeave={(event) => handleDragLeave(event)}
      onDragEnd={(event) => handleDragEnd(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDrop={(event) => handleDrop(event, task)}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '4px',
        zIndex: 1,
        margin: 'auto',
        fontSize: '20px',
        alignItems: 'center',
        height: 'fit-content',
        cursor: !currentCard ? 'grab' : 'grabbing',
      }}>
        <DragOutlined />
      </div>
      <Card
        style={{
          paddingLeft: '8px'
        }}
        title={
          <div style={{display: 'flex', alignItems: 'center', whiteSpace: 'normal', overflowWrap: 'anywhere'}}>
          <Checkbox
            onChange={(event) => handleCheck(task.id, index, task.value, event.target.checked)}
            checked={task.success}
            style={{marginRight: '10px'}}
          />
            {
              !(editTaskId === task.id)
                ?
              task.value
                :
              <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                <Input value={editValue} onChange={(event) => setEditValue(event.target.value)}/>
                <Button type="primary" onClick={handleCheck.bind(this, task.id, index, editValue, task.success)}>
                  <SaveOutlined/>
                </Button>
              </div>
            }
          </div>
        }
        extra={
          <>
            <Button type="primary" onClick={handleChangeItem.bind(this, task.id, task.value)}>
              <EditOutlined/>
            </Button>
            <Button type="primary" danger onClick={handleDelete.bind(this, task.id)}>
              <DeleteOutlined/>
            </Button>
          </>
        }
        key={index}
        bodyStyle={{display: 'none'}}
      />
    </li>
  ));

  return (
    <div>
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
      <Row justify="center">
        <Col
          md={{span: 12}}
          sm={{span: 20}}
          xs={{span: 24}}
        >
          <ul style={{listStyle: 'none', padding: 0}}>
            {tasksListItems}
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
    save: (value, order) => todoActions.save(value, order).then(result => dispatch(result)),
    getTasks: () => todoActions.getTasks().then(result => dispatch(result)),
    update: (id, index, value, valueSuccess) => todoActions.update(id, index, value, valueSuccess).then(result => dispatch(result)),
    remove: id => todoActions.remove(id).then(result => dispatch(result)),
    changeOrder: (taskA, taskB) => todoActions.changeOrder(taskA, taskB).then(result => dispatch(result)),
  })
)(TodoList);
