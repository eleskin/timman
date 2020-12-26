import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import authActions from '../../utils/auth/authActions';
import documentsActions from '../../utils/documents/documentsActions';

const Settings = (props) => {
  const handleLogout = (event) => {
    event.preventDefault();
    props.logout() && props.clear();
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default connect(
  null,
  dispatch => ({
    logout: () => authActions.logout().then(result => dispatch(result)),
    clear: () => documentsActions.clear().then(result => dispatch(result))
  }))
(Settings);