import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Form, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';

const Documents = (props) => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState(0);

  const handleUploadFile = (event) => setFile({file: event.target.files[0]});

  useEffect(() => {
    if (file) {
      props.upload(file);
      setKey(Math.random());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleDownload = (event, index) => {
    event.preventDefault();
    props.download(index);
  };

  const handleRemove = (event, index) => {
    event.preventDefault();
    props.remove(index);
  };

  const getFiles = props.getFiles;
  useEffect(() => getFiles(), [getFiles]);

  const documentsList = props.documents.map((document, index) => (
    <Col md={3} key={index}>
      <Card>
        <Card.Body>
          <Card.Text>{document.title}</Card.Text>
          <Card.Link
            href=""
            onClick={event => handleDownload(event, document.id)}
          >
            Download
          </Card.Link>
          <Card.Link
            href=""
            onClick={event => handleRemove(event, document.id)}
          >
            Remove
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <div>
      <Container fluid>
        <Form encType="multipart/form-data">
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              onChange={handleUploadFile}
              key={key}
              required
              accept="application/pdf"
            />
          </Form.Group>
        </Form>
        <Row>{documentsList}</Row>
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
    upload: data => documentsActions.upload(data).then(result => dispatch(result)),
    getFiles: () => documentsActions.getFiles().then(result => dispatch(result)),
    download: index => documentsActions.download(index).then(result => dispatch(result)),
    remove: index => documentsActions.remove(index).then(result => dispatch(result))
  })
)
(Documents);