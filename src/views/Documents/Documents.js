import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import {Upload, Row, Col, Card, Empty, Progress} from 'antd';
import {InboxOutlined, DownloadOutlined, DeleteOutlined} from '@ant-design/icons';

const {Dragger} = Upload;
const {Meta} = Card;

const Documents = (props) => {
  const [errorMessage, setErrorMessage] = useState('');

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
    <Col
      xxl={{span: 3}}
      xl={{span: 4}}
      lg={{span: 6}}
      md={{span: 8}}
      sm={{span: 12}}
      xs={{span: 12}}
      key={index}
    >
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
          <Progress percent={props.size * 10} showInfo={false}/>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{textAlign: 'center'}}>
          <span>{props.size} / 10 Mb</span>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Dragger
            multiple={false}
            showUploadList={false}
            beforeUpload={file => {
              props.upload(file).catch(() => setErrorMessage('File size exceeds free disk space'));
              return false;
            }}
          >
            <span style={{color: 'red'}}>{errorMessage}</span>
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
    const {documents, size} = state.documentsReducer;

    return {documents, size};
  },
  dispatch => ({
    upload: data => documentsActions.upload(data).then(result => dispatch(result)),
    getFiles: () => documentsActions.getFiles().then(result => dispatch(result)),
    download: data => documentsActions.download(data),
    remove: index => documentsActions.remove(index).then(result => dispatch(result))
  })
)
(Documents);