import React, {useEffect, useState} from 'react';
import styles from './Notes.module.css';
import {Button, Col, Menu, Row, Input} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import notesActions from '../../utils/notes/notesActions'
import {Link} from 'react-router-dom';

const {TextArea} = Input;

const Notes = props => {
  // const {id} = useParams();

  const [visibleInput, setVisibleInput] = useState(false);
  const [noteValue, setNoteValue] = useState('');

  const handleChange = event => {
    setNoteValue(event.target.value);
    console.log(noteValue);
  };

  const handleClick = () => {
    setVisibleInput(true);
    !visibleInput && props.create();
  };

  const handleSelect = (event, id) => {
    setVisibleInput(true);
    props.getNoteValue(id);
    setNoteValue(props.noteValue);
  };

  const getNotes = props.getNotes;
  useEffect(getNotes, [getNotes]);

  const notesList = props.notes.map(note => (
    <Menu.Item key={`/notes/${note.id}`} onClick={event => handleSelect(event, note.id)}>
      <Link to={`/notes/${note.id}`}>
        {note.title ? note.title : 'Untitled'}
      </Link>
    </Menu.Item>
  ));

  return (
    <div className={styles.notes}>
      <Row gutter={[16, 16]} className={styles.notes__row}>
        <Col span={4} className={styles.notes__list} style={{height: '100%'}}>
          <Button
            type="primary"
            shape="round"
            block
            onClick={handleClick}
          >
            <PlusOutlined/> New note
          </Button>
          <Menu
            mode="vertical"
            className={styles.notes__menu}
          >
            {notesList}
          </Menu>
        </Col>
        <Col span={20} className={styles.notes__body} style={{height: '100%'}}>
          {
            visibleInput
            &&
            <TextArea
              placeholder="Enter text"
              className={styles.notes__text}
              style={{height: '100%', resize: 'none'}}
              value={noteValue}
              onChange={handleChange}
            />
          }
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  state => {
    const {notes, noteValue} = state.notesReducer;

    return {notes, noteValue};
  },
  dispatch => ({
    create: () => notesActions.create().then(result => dispatch(result)),
    getNotes: () => notesActions.getNotes().then(result => dispatch(result)),
    getNoteValue: id => notesActions.getNoteValue(id).then(result => dispatch(result))
  })
)(Notes);