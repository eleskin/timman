import React, {useEffect} from 'react';
// import {Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import {Button, Card, Col, Empty, Row, Typography} from 'antd';
import {DownloadOutlined, FileTextOutlined} from '@ant-design/icons';
import notesActions from '../../utils/notes/notesActions';

const {Title} = Typography;

const Home = props => {
  const getFiles = props.getFiles;
  const getNotes = props.getNotes;
  useEffect(() => {
    getFiles();
    getNotes();
  }, [getFiles, getNotes]);

  const handleDownload = (event, index, name) => {
    event.preventDefault();
    props.download({index, name});
  };

  const documentsList = props.documents.slice(0, 5).map((document, index) => (
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

  const notesList = props.notes.slice(0, 5).map((note, index) => (
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

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col md={6}>
          <Row justify="space-between">
            <Title level={3}>Notes</Title>
            <Link to="/notes">See all</Link>
          </Row>
          <div>{notesList.length ? notesList : <Empty/>}</div>
        </Col>
        <Col md={6}>
          <Row justify="space-between">
            <Title level={3}>Documents</Title>
            <Link to="/documents">See all</Link>
          </Row>
          <div>{documentsList.length ? documentsList : <Empty/>}</div>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  state => {
    const {documents} = state.documentsReducer;
    const {notes} = state.notesReducer;

    return {documents, notes};
  },
  dispatch => ({
    getFiles: () => documentsActions.getFiles().then(result => dispatch(result)),
    download: index => documentsActions.download(index),
    getNotes: () => notesActions.getNotes().then(result => dispatch(result)),
  })
)
(Home);