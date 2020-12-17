import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';

const Documents = (props) => {
  const [file, setFile] = useState(null);

  const changeFile = (event) => {
    setFile({file: event.target.files[0]});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.upload(file);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group>
          <Form.File id="exampleFormControlFile1" onChange={changeFile}/>
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default connect(
  null,
  () => ({
    upload: data => documentsActions.upload(data)
  })
)
(Documents);