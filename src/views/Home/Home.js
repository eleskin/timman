import React, {useEffect} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';

const Home = (props) => {
  const getFiles = props.getFiles;
  useEffect(() => getFiles(), [getFiles]);

  const documentsList = props.documents.map((document, index) => (
    <li key={index}>
      {document.title}
    </li>

    // <Col md={3} key={index}>
    //   <Card>
    //     <Card.Body>
    //       <Card.Text>{document.title}</Card.Text>
    //       <Card.Link
    //         href=""
    //         // onClick={event => handleDownload(event, document.id)}
    //       >
    //         Download
    //       </Card.Link>
    //       <Card.Link
    //         href=""
    //         // onClick={event => handleRemove(event, document.id)}
    //       >
    //         Remove
    //       </Card.Link>
    //     </Card.Body>
    //   </Card>
    // </Col>
  ));


  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}>
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