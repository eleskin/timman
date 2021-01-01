import React, {useState} from 'react';
import styles from './Notes.module.css';
import {Button, Col, Menu, Row, Input} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

const {TextArea} = Input;

const Notes = () => {
  // const {id} = useParams();

  const [visibleInput, setVisibleInput] = useState(false);
  const [noteValue, setNoteValue] = useState('');

  const handleChange = event => {
    console.log(event.target.value);
    setNoteValue(event.target.value);
  };

  const handleClick = event => {
    // console.log(event.target.value);
    // setNoteValue(event.target.value);
    setVisibleInput(true);
  };

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
          <Menu mode="vertical" className={styles.notes__menu}>
            {/*<Menu.Item key="/notes/1">*/}
            {/*  <Link to="/notes/1">Home</Link>*/}
            {/*</Menu.Item>*/}
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

export default Notes;