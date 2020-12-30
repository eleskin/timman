import React, {useEffect} from 'react';
// import {Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import {Button, Card, Col, Row, Typography} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';

const {Title} = Typography;

const Home = props => {
  const getFiles = props.getFiles;
  useEffect(() => getFiles(), [getFiles]);

  const handleDownload = (event, index) => {
    event.preventDefault();
    props.download(index);
  };

  const documentsList = props.documents.slice(0, 5).map((document, index) => (
    <Card
      title={document.title}
      extra={
        <Button type="primary" icon={<DownloadOutlined/>} onClick={event => handleDownload(event, document.id)}/>
      }
      key={index}
      bodyStyle={{display: 'none'}}
    />
  ));

  return (
    <div>
      <Row>
        <Col md={6}>
          <Row justify="space-between">
            <Title level={3}>Documents</Title>
            <Link to="/documents">See all</Link>
          </Row>
          <div>{documentsList}</div>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  (state) => {
    const {documents} = state.documentsReducer;

    return {documents};
  },
  dispatch => ({
    getFiles: () => documentsActions.getFiles().then(result => dispatch(result)),
    download: index => documentsActions.download(index).then(result => dispatch(result))
  })
)
(Home);