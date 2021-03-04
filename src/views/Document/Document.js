import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';
import {DownloadOutlined} from '@ant-design/icons';
import {Card} from 'antd';

const {Meta} = Card;

const Document = (props) => {
  const {id} = useParams();

  const getShareDocument = props.getShareDocument;
  useEffect(() => getShareDocument(id), [getShareDocument, id]);

  return (
    <Card
      actions={[
        <DownloadOutlined onClick={() => props.download({index: document.id, name: document.title})}/>,
      ]}
    >
      <Meta
        title={props.document}
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
    download: data => documentsActions.download(data),
    getShareDocument: (id) => documentsActions.getShareDocument(id).then(result => dispatch(result)).catch(result => dispatch(result))
  })
)(Document);
