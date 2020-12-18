import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';

const Documents = (props) => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState(0);

  const changeFile = (event) => {
    setFile({file: event.target.files[0]});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.upload(file);
    setKey(Math.random());
  };
  
  const getFiles = props.getFiles;

  useEffect(() => getFiles(), [getFiles]);

  const documentsList = props.documents.map(document => <li key={document.id}>{document.title}</li>);

  return (
    <div>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group>
          <Form.File id="exampleFormControlFile1" onChange={changeFile} key={key} required/>
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Submit
        </Button>
      </Form>
      <ul>{documentsList}</ul>
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
    getFiles: () => documentsActions.getFiles().then(result => dispatch(result))
  })
)
(Documents);