import React, {useEffect} from 'react';
// import {Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import {Button, Card, Col, Row, Typography} from 'antd';
import {VerticalAlignBottomOutlined} from '@ant-design/icons';

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
        <Button onClick={event => handleDownload(event, document.id)}>
          <VerticalAlignBottomOutlined/>
        </Button>
      }
      key={index}
      bodyStyle={{display: 'none'}}
    />
  ));

  return (
    <div>
      <Row>
        <Col md={6}>
          <Title level={3}>Documents</Title>
          <div>{documentsList}</div>
          <Link to="/documents">See all</Link>
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