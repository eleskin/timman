import React from 'react';
import styles from '../../Notes.module.css';
import {Col, Input} from 'antd';

const {TextArea} = Input;

const NotesEditor = props => {
  return (
    <Col
      xxl={{span: 21}}
      xl={{span: 20}}
      lg={{span: 20}}
      md={{span: 18}}
      sm={{span: 16}}
      xs={{span: 14}}
      className={styles.notes__body}
      style={{height: '100%'}}
    >
      {
        props.visibleInput
        &&
        <TextArea
          placeholder="Enter text"
          className={styles.notes__text}
          style={{height: '100%', resize: 'none'}}
          value={props.noteValue}
          onChange={event => props.handleChange(event, props.id)}
        />
      }
    </Col>
  );
};

export default NotesEditor;