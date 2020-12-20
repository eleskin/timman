import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import axios from 'axios';
import {getToken} from '../../utils/auth';
import PdfViewer from '../../components/PdfViewer/PdfViewer';

const Documents = (props) => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState(0);
  const [pdfActive, setPdfActive] = useState(false);
  const [documentUrl, setDocumentUrl] = useState(null);

  const changeFile = (event) => {
    setFile({file: event.target.files[0]});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.upload(file);
    setKey(Math.random());
  };

  const handleDownload = (event, documentUrl) => {
    const link = document.createElement('a');
    link.href = documentUrl;
    link.setAttribute('download', 'file.pdf');
    document.body.appendChild(link);
    link.click();
    setPdfActive(false);

    // axios
    //   .get(`http://127.0.0.1:8000/api/documents/${index}`, {
    //     headers: {
    //       Authorization: getToken()
    //     },
    //     responseType: 'blob'
    //   })
    //   .then(response => {
    //     console.log(response)
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', 'file.pdf'); //or any other extension
    //     document.body.appendChild(link);
    //     link.click();
    //   });
  };

  const handleView = (event, index) => {
    axios
      .get(`http://127.0.0.1:8000/api/documents/${index}`, {
        headers: {
          Authorization: getToken()
        },
        responseType: 'blob'
      })
      .then(response => {
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf'); //or any other extension
        document.body.appendChild(link);
        setDocumentUrl(url);
      });
    setPdfActive(true);
  };

  const getFiles = props.getFiles;
  useEffect(() => getFiles(), [getFiles]);

  const documentsList = props.documents
    .map(document => (
      <li
        key={document.id}
        onClick={event => handleView(event, document.id)}
      >
        {document.title}
      </li>
    ));

  return (
    <div>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group>
          <Form.File
            id="exampleFormControlFile1"
            onChange={changeFile}
            key={key}
            required
            accept="application/pdf"
          />
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Submit
        </Button>
      </Form>
      <ul>{documentsList}</ul>
      {
        pdfActive
        &&
        <PdfViewer
          document={documentUrl}
          handleClose={() => {setPdfActive(false); setDocumentUrl(null)}}
          handleDownload={event => handleDownload(event, documentUrl)}
        />
      }
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