import React, {useState} from 'react';
import {Document, Page} from 'react-pdf';
import styles from './PdfViewer.module.css';
import {Button} from 'react-bootstrap';

const PdfViewer = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className={styles.pdfViewer}>
      <div className={styles.pdfViewer__buttons}>
        <Button variant="primary" onClick={props.handleDownload}>Download</Button>
        <Button variant="danger" onClick={props.handleClose}>Close</Button>
      </div>
      <Document
        file={props.document}
        className={styles.pdfViewer__document}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber}/>
      </Document>
    </div>
  );
};

export default PdfViewer;