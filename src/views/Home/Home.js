import React, {useEffect} from 'react';
// import {Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import {Button, Card, Col, Empty, Row, Typography} from 'antd';
import {DownloadOutlined, FileTextOutlined, EditOutlined} from '@ant-design/icons';
import notesActions from '../../utils/notes/notesActions';
import todoActions from '../../utils/todo/todoActions';

const {Title} = Typography;

const Home = props => {
  const getFiles = props.getFiles;
  const getNotes = props.getNotes;
  const getTasks = props.getTasks;
  useEffect(() => {
    getFiles();
    getNotes();
    getTasks();
  }, [getFiles, getNotes, getTasks]);

  const handleDownload = (event, index, name) => {
    event.preventDefault();
    props.download({index, name});
  };

  const documentsList = props.documents.slice(0, 3).map((document, index) => (
    <Card
      title={document.title}
      extra={
        <Button
          type="primary"
          icon={<DownloadOutlined/>}
          onClick={event => handleDownload(event, document.id, document.title)}
        />
      }
      key={index}
      bodyStyle={{display: 'none'}}
    />
  ));

  const notesList = props.notes.slice(0, 3).map((note, index) => (
    <Card
      title={note.title || 'Untitled'}
      extra={
        <Link to={`/notes/${note.id}`}>
          <Button
            type="primary"
            icon={<FileTextOutlined/>}
          >
          </Button>
        </Link>
      }
      key={index}
      bodyStyle={{display: 'none'}}
    />
  ));

  const taskList = props.tasks.slice(0, 3).map((task, index) => (
    <Card
      title={task.value}
      extra={
        <Link to={`/todo`}>
          <Button
            type="primary"
            icon={<EditOutlined />}
          >
          </Button>
        </Link>
      }
      key={index}
      bodyStyle={{display: 'none'}}
    />
  ));

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col
          xxl={{span: 4}}
          xl={{span: 6}}
          lg={{span: 8}}
          md={{span: 10}}
          sm={{span: 12}}
          xs={{span: 24}}
        >
          <Row justify="space-between">
            <Title level={3}>Notes</Title>
            <Link to="/notes">See all</Link>
          </Row>
          <div>{notesList.length ? notesList : <Empty/>}</div>
        </Col>
        <Col
          xxl={{span: 4}}
          xl={{span: 6}}
          lg={{span: 8}}
          md={{span: 10}}
          sm={{span: 12}}
          xs={{span: 24}}
        >
          <Row justify="space-between">
            <Title level={3}>Documents</Title>
            <Link to="/documents">See all</Link>
          </Row>
          <div>{documentsList.length ? documentsList : <Empty/>}</div>
        </Col>
        <Col
          xxl={{span: 4}}
          xl={{span: 6}}
          lg={{span: 8}}
          md={{span: 10}}
          sm={{span: 12}}
          xs={{span: 24}}
        >
          <Row justify="space-between">
            <Title level={3}>Tasks</Title>
            <Link to="/todo">See all</Link>
          </Row>
          <div>{taskList.length ? taskList : <Empty/>}</div>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  state => {
    const {documents} = state.documentsReducer;
    const {notes} = state.notesReducer;
    const {tasks} = state.todoReducer;

    return {documents, notes, tasks};
  },
  dispatch => ({
    getFiles: () => documentsActions.getFiles().then(result => dispatch(result)),
    download: index => documentsActions.download(index),
    getNotes: () => notesActions.getNotes().then(result => dispatch(result)),
    getTasks: () => todoActions.getTasks().then(result => dispatch(result)),
  })
)
(Home);