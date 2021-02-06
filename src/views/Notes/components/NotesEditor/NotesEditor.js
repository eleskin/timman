import React, {useEffect, useState} from 'react';
import styles from '../../Notes.module.css';
import {Col, Input} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NotesEditor = props => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  const onSetTitle = (title, id) => {
    setTitle(title);
    props.handleChange(title, props.noteValue, id);
  };

  const onSetValue = (value, id) => {
    setValue(value);
    props.handleChange(props.noteTitle, value, id);
  };

  useEffect(() => {
    setTitle(props.noteTitle);
    setValue(props.noteValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.noteTitle, props.noteValue]);

  return (
    <Col
      xxl={{span: 21}}
      xl={{span: 20}}
      lg={{span: 20}}
      md={{span: 18}}
      sm={{span: 16}}
      xs={{span: 14}}
      className={styles.notes__body}
      style={{height: 'auto'}}
    >
      {
        props.visibleInput
        &&
        <>
          <Input
            placeholder="Enter title"
            value={title}
            onChange={event => onSetTitle(event.target.value, props.id)}
          />
          <ReactQuill
            theme="snow"
            value={value}
            onChange={value => onSetValue(value, props.id)}
            style={{height: '100%', resize: 'none', backgroundColor: '#ffffff'}}
          />
        </>
      }
    </Col>
  );
};

export default NotesEditor;