import React, {useEffect, useState} from 'react';
import styles from '../../Notes.module.css';
import {Col} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NotesEditor = props => {
  const [value, setValue] = useState('');

  const onSetValue = (value, id) => {
    setValue(value);
    props.handleChange('', value, id);
  };

  useEffect(() => {
    setValue(props.noteValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.noteValue]);

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
