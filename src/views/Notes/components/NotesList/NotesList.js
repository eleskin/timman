import React, {createRef} from 'react';
import styles from '../../Notes.module.css';
import {Button, Col, Menu, Result} from 'antd';
import {DeleteOutlined, PlusOutlined, SaveOutlined} from '@ant-design/icons';
import {Link, useLocation, useHistory} from 'react-router-dom';
import store from '../../../../store/store';
import {connect} from 'react-redux';
import notesActions from '../../../../utils/notes/notesActions';

const NotesList = props => {
  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    props.createNote();
  };

  const handleSelect = async (event, id) => {
    await props.getNoteValue(id);
    props.setNoteValue(store.getState().notesReducer.noteValue);
    props.setNoteTitle(store.getState().notesReducer.noteTitle);
    props.setVisibleInput(true);
  };

  const parentRef = createRef();

  const notesList = props.notes.map(note => (
    <Menu.Item
      key={`/notes/${note.id}`}
      style={{display: 'flex', justifyContent: 'space-between', flexShrink: '0', alignItems: 'center'}}
    >
      <Link
        to={`/notes/${note.id}`}
        onClick={event => handleSelect(event, note.id)}
      >
        <span>{note.title ? note.title : 'Untitled'}</span>
      </Link>
      <Button
        onClick={event => {
          event.preventDefault();
          props.setVisibleInput(false);
          history.push("/notes");
          props.remove(note.id);
        }}>
        <i><DeleteOutlined style={{margin: '0'}}/></i>
      </Button>
    </Menu.Item>
  ));

  return (
    <Col
      xxl={{span: 3}}
      xl={{span: 4}}
      lg={{span: 4}}
      md={{span: 6}}
      sm={{span: 8}}
      xs={{span: 10}}
      style={{maxHeight: '100%'}}
    >
      <Button
        type="primary"
        shape="round"
        block
        onClick={handleClick}
      >
        <PlusOutlined/> New note
      </Button>
      <div ref={parentRef} style={{overflowY: 'scroll', overflowX: 'visible', maxHeight: '100%'}}>
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
      </div>
    </Col>
  );
};

export default connect(null, dispatch => ({
  getNotes: () => notesActions.getNotes().then(result => dispatch(result)),
  remove: id => notesActions.remove(id).then(result => dispatch(result))
}))(NotesList);