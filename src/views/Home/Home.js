import React, {useEffect} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';

const Home = props => {
  const getFiles = props.getFiles;
  useEffect(() => getFiles(), [getFiles]);

  const documentsList = props.documents.map((document, index) => (
    <li key={index}>
      {document.title}
    </li>
  ));

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={5}>
            <h3>Documents</h3>
            <ul>{documentsList}</ul>
            <Link to="/documents">See all</Link>
          </Col>
        </Row>
      </Container>
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