import React from 'react';
import styles from '../../Notes.module.css';
import {Button, Col, Menu, Result} from 'antd';
import {PlusOutlined, SaveOutlined} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import store from '../../../../store/store';

const NotesList = props => {
  const location = useLocation();

  const handleClick = () => {
    props.setVisibleInput(true);
    props.create();
  };

  const handleSelect = async (event, id) => {
    await props.getNoteValue(id);
    props.setNoteValue(store.getState().notesReducer.noteValue);
    props.setVisibleInput(true);
  };

  const handleContextMenu = event => {
    event.preventDefault();
    console.log(event)
  };

  const notesList = props.notes.map(note => (
    <Menu.Item
      key={`/notes/${note.id}`}
      onClick={event => handleSelect(event, note.id)}
      onContextMenu={handleContextMenu}
    >
      <Link to={`/notes/${note.id}`} >
        {note.title ? note.title : 'Untitled'}
      </Link>
    </Menu.Item>
  ));

  return (
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
        props.menuEnable
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
  );
};

export default NotesList;