import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import documentsActions from '../../utils/documents/documentsActions';

const Document = (props) => {
  const {id} = useParams();

  const getShareDocument = props.getShareDocument;
  useEffect(() => getShareDocument(id), [getShareDocument, id]);

  return (
    <div>{id}</div>
  );
};

export default connect(
  null,
  () => ({
    getShareDocument: (id) => documentsActions.getShareDocument(id)
  })
)(Document);
