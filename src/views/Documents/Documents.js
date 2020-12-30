import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import {Upload, Row, Col, Card} from 'antd';
import {InboxOutlined, VerticalAlignBottomOutlined, DeleteOutlined} from '@ant-design/icons';

const {Dragger} = Upload;
const { Meta } = Card;

const Documents = (props) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      props.upload(file);
      setFile(null);
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
  useEffect(getFiles, [getFiles]);

  const documentsList = props.documents.map((document, index) => (
    <Col md={6} key={index}>
      <Card
        actions={[
          <VerticalAlignBottomOutlined onClick={event => handleDownload(event, document.id)}/>,
          <DeleteOutlined onClick={event => handleRemove(event, document.id)}/>
        ]}
      >
        <Meta
          title={document.title}
        />
      </Card>
    </Col>
  ));

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Dragger
            showUploadList={false}
            beforeUpload={file => {
              setFile({file});
              return false;
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </Dragger>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>{documentsList}</Row>
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