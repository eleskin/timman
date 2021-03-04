import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import {Upload, Row, Col, Card, Empty, Progress, Button, Popover, message} from 'antd';
import {InboxOutlined, DownloadOutlined, DeleteOutlined, CopyOutlined} from '@ant-design/icons';

const {Dragger} = Upload;
const {Meta} = Card;

const Documents = (props) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = (event, index, name) => {
    setErrorMessage('');
    event.preventDefault();
    props.download({index, name});
  };

  const handleRemove = (event, index) => {
    setErrorMessage('');
    event.preventDefault();
    props.remove(index);
  };

  const getFiles = props.getFiles;
  useEffect(getFiles, [getFiles]);

  const [documentName, setDocumentName] = useState('');

  const handleShare = (event, id) => {
    props.share(id).then(response => setDocumentName(response));
  };

  const [visible, setVisible] = useState(false);

  const handeCopyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.href}/${documentName}`);
    message.success('Copied!');
    setVisible(false);
  };

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
        <Popover
          title="Share"
          trigger="click"
          visible={visible}
          onVisibleChange={() => setVisible(!visible)}
          content={
            <div style={{display: 'flex', maxWidth: 'calc(100vw - 40px)'}}>
            <span style={{overflowX: 'scroll', display: 'inline-block'}}>
              {window.location.href}/{documentName}
            </span>
              <Button onClick={handeCopyToClipboard}><CopyOutlined/></Button>
            </div>
          }
        >
          <Button type="link" style={{padding: '8px 0'}}
                  onClick={(event) => handleShare(event, document.id)}>Share</Button>
        </Popover>
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
              setErrorMessage('');
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
    remove: index => documentsActions.remove(index).then(result => dispatch(result)),
    share: (id) => documentsActions.share(id)
  })
)
(Documents);
