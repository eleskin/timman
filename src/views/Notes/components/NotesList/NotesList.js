import React, {useState, createRef, useEffect} from 'react';
import styles from '../../Notes.module.css';
import {Button, Col, Menu, Result} from 'antd';
import {PlusOutlined, SaveOutlined} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import store from '../../../../store/store';
import ContextMenu from '../../../../components/ContextMenu/ContextMenu';
import {connect} from 'react-redux';
import notesActions from '../../../../utils/notes/notesActions';

const NotesList = props => {
    const [screenX, setScreenX] = useState(null);
    const [screenY, setScreenY] = useState(null);
    const [visibleContextMenu, setVisibleContextMenu] = useState(false);
    const [noteID, setNoteID] = useState(null);

    const location = useLocation();

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

    const handleContextMenu = (event, id) => {
      event.preventDefault();

      const parent = parentRef.current.getBoundingClientRect();
      const x = event.clientX - parent.left;
      const y = event.clientY - parent.top;

      setNoteID(id);
      setScreenX(x);
      setScreenY(y);
      setVisibleContextMenu(true);
    };

    const notesList = props.notes.map(note => (
      <Menu.Item
        key={`/notes/${note.id}`}
        onClick={event => handleSelect(event, note.id)}
        onContextMenu={event => handleContextMenu(event, note.id)}
      >
        <Link to={`/notes/${note.id}`}>
          {note.title ? note.title : 'Untitled'}
        </Link>
      </Menu.Item>
    ));

    useEffect(() => {
      window.addEventListener('click', () => {
        visibleContextMenu && setVisibleContextMenu(false);
      });
      return () => visibleContextMenu && setVisibleContextMenu(false);
    });

    return (
      <Col
        xxl={{span: 3}}
        xl={{span: 4}}
        lg={{span: 4}}
        md={{span: 6}}
        sm={{span: 8}}
        xs={{span: 10}}
        className={styles.notes__list}
        style={{height: '100%'}}
      >
        <Button
          type="primary"
          shape="round"
          block
          onClick={handleClick}
        >
          <PlusOutlined/> New note
        </Button>
        <div ref={parentRef} style={{position: 'relative'}}>
          <ContextMenu
            className={visibleContextMenu ? 'visible' : 'hidden'}
            screenX={screenX}
            screenY={screenY}
            noteID={noteID}
            onRemove={props.remove}
          />
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
  }
;

export default connect(null, dispatch => ({
  getNotes: () => notesActions.getNotes().then(result => dispatch(result)),
  remove: id => notesActions.remove(id).then(result => dispatch(result))
}))(NotesList);