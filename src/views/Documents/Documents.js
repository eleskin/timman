import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import {Upload, Row, Col, Card, Empty} from 'antd';
import {InboxOutlined, DownloadOutlined, DeleteOutlined} from '@ant-design/icons';

const {Dragger} = Upload;
const {Meta} = Card;

const Documents = (props) => {
  const handleDownload = (event, index, name) => {
    event.preventDefault();
    props.download({index, name});
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
          <DownloadOutlined onClick={event => handleDownload(event, document.id, document.title)}/>,
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
            multiple={true}
            showUploadList={false}
            beforeUpload={file => {
              props.upload(file);
              return false;
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {documentsList.length ? documentsList : <Col span={24}><Empty/></Col>}
      </Row>
    </div>
  );
};

export default connect(
  state => {
    const {documents} = state.documentsReducer;

    return {documents};
  },
  dispatch => ({
    upload: data => documentsActions.upload(data).then(result => dispatch(result)),
    getFiles: () => documentsActions.getFiles().then(result => dispatch(result)),
    download: data => documentsActions.download(data),
    remove: index => documentsActions.remove(index).then(result => dispatch(result))
  })
)
(Documents);