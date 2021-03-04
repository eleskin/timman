import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import {DownloadOutlined} from '@ant-design/icons';
import {Card} from 'antd';

const {Meta} = Card;

const Document = (props) => {
  const {id} = useParams();
  const [document, setDocument] = useState('');

  const getShareDocument = props.getShareDocument;
  useEffect(() => {
    getShareDocument(id).then(result => setDocument(result))
  }, [getShareDocument, id]);

  return (
    <Card
      actions={[
        <DownloadOutlined onClick={() => props.downloadShareDocument(id)}/>,
      ]}
    >
      <Meta
        title={document}
      />
    </Card>
  );
};

export default connect(
  state => {
    const {document} = state.documentsReducer;

    return {document};
  },
  (dispatch) => ({
    downloadShareDocument: hash => documentsActions.downloadShareDocument(hash),
    getShareDocument: (id) => documentsActions.getShareDocument(id).then(result => result).catch(result => dispatch(result))
  })
)(Document);
