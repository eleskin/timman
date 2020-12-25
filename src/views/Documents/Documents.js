import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import styles from './Documents.module.css';
import Dropzone from 'react-dropzone';

const Documents = (props) => {
  const [file, setFile] = useState(null);

  const handleUploadFile = acceptedFiles => setFile({file: acceptedFiles[0]});

  useEffect(() => {
    if (file) {
      props.upload(file);
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
        <Dropzone onDrop={acceptedFiles => handleUploadFile(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <div className={styles.form__upload}>
              <div className={styles.form__upload_label} {...getRootProps()}>
                <input {...getInputProps()} multiple={false}/>
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </div>
          )}
        </Dropzone>
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