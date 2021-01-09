import React, {useEffect, useState} from 'react';
import styles from './Notes.module.css';
import {Button, Col, Menu, Row, Input, Result} from 'antd';
import {PlusOutlined, SaveOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import notesActions from '../../utils/notes/notesActions';
import {Link, useLocation, useParams} from 'react-router-dom';
import store from '../../store/store';

const {TextArea} = Input;

const Notes = props => {
  const [visibleInput, setVisibleInput] = useState(false);
  const [noteValue, setNoteValue] = useState('');
  const [timerID, setTimerID] = useState(Number());
  const [menuEnable, setMenuEnable] = useState(true);

  const {id} = useParams();
  const location = useLocation();

  // useEffect(() => {
  //   props.getNoteValue(id);
  //   setNoteValue(store.getState().notesReducer.noteValue);
  //   setVisibleInput(true);
  // }, []);

  const handleChange = (event, id) => {
    setMenuEnable(false);

    clearTimeout(timerID);
    setNoteValue(event.target.value);

    const timer = setTimeout(async () => {
      await props.save(id, event.target.value, event.target.value.split('\n')[0]);
      setMenuEnable(true);
    }, 1000);

    setTimerID(timer);
  };

  const handleClick = () => {
    setVisibleInput(true);
    props.create();
  };

  const handleSelect = async (event, id) => {
    await props.getNoteValue(id);
    setNoteValue(store.getState().notesReducer.noteValue);
    setVisibleInput(true);
  };

  useEffect(() => {
    (async () => {
      props.getNotes();
      await props.getNoteValue(id);
      setNoteValue(store.getState().notesReducer.noteValue);
      id && setVisibleInput(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const notesList = props.notes.map(note => (
    <Menu.Item
      key={`/notes/${note.id}`}
      onClick={event => handleSelect(event, note.id)}
    >
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
          {
            menuEnable
              ?
              <Menu
                mode="vertical"
                className={styles.notes__menu}
                selectedKeys={location.pathname}
              >
                {notesList}
              </Menu>
              :
              <Result
                icon={<SaveOutlined/>}
                title="Saving"
              />
          }
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
              onChange={event => handleChange(event, id)}
            />
          }
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  state => {
    const {notes, noteValue, noteTitle} = state.notesReducer;

    return {notes, noteValue, noteTitle};
  },
  dispatch => ({
    create: () => notesActions.create().then(result => dispatch(result)),
    getNotes: () => notesActions.getNotes().then(result => dispatch(result)),
    getNoteValue: id => notesActions.getNoteValue(id).then(result => dispatch(result)),
    save: (id, value, title) => notesActions.save(id, value, title).then(result => dispatch(result))
  })
)(Notes);