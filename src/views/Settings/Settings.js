import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import authActions from '../../utils/auth/authActions';

const Settings = (props) => {
  const handleLogout = (event) => {
    event.preventDefault();
    props.logout();
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
    logout: () => authActions.logout().then(result => dispatch(result))
  }))
(Settings);