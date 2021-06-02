import React, {useEffect, useState} from 'react';
import styles from './Notes.module.css';
import {Row} from 'antd';
import {connect} from 'react-redux';
import notesActions from '../../utils/notes/notesActions';
import {useHistory, useParams} from 'react-router-dom';
import store from '../../store/store';
import NotesList from './components/NotesList/NotesList';
import NotesEditor from './components/NotesEditor/NotesEditor';

const Notes = props => {
  const [visibleInput, setVisibleInput] = useState(false);
  const [noteValue, setNoteValue] = useState('');
  const [timerID, setTimerID] = useState(Number());
  const [menuEnable, setMenuEnable] = useState(true);

  const {id} = useParams();
  const history = useHistory();

  const handleChange = (title, value, id) => {
    setMenuEnable(false);

    clearTimeout(timerID);
    setNoteValue(value);

    const timer = setTimeout(async () => {
      await props.save(id, value, title);
      setMenuEnable(true);
    }, 1500);

    setTimerID(timer);
  };

  useEffect(() => {
    (async () => {
      props.getNotes();

      props.notes.filter(note => note.id === id).length === 0 && history.push("/notes");

      await props.getNoteValue(id);
      setNoteValue(store.getState().notesReducer.noteValue);
      props.notes.filter(note => note.id === id).length !== 0 && setVisibleInput(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.notes}>
      <Row gutter={[16, 16]} className={styles.notes__row}>
        <NotesList
          notes={props.notes}
          getNoteValue={props.getNoteValue}
          setNoteValue={setNoteValue}
          menuEnable={menuEnable}
          setVisibleInput={setVisibleInput}
          createNote={props.create}
        />
        <NotesEditor
          visibleInput={visibleInput}
          noteValue={noteValue}
          handleChange={handleChange}
          id={id}
        />
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
