import React, {useState} from 'react';
import styles from './Header.module.css';
import {Button, Col, Layout, Popover, Row} from 'antd';
import {connect} from 'react-redux';
import authActions from '../../utils/auth/authActions';
import documentsActions from '../../utils/documents/documentsActions';
import notesActions from '../../utils/notes/notesActions';
import {useMediaQuery} from 'react-responsive';
import {Link} from 'react-router-dom';

const Header = props => {
  const [visible, setVisible] = useState(false);
  const isMobile = useMediaQuery({query: '(min-width: 576px)'});

  const handleLogout = async event => {
    event.preventDefault();
    await props.logout();
  };

  return (
    <Layout.Header className={`site-layout-background ${styles.header__container}`}>
      <Row justify="space-between">
        <Col>
          {!isMobile && <Link to="/" className={styles.header__logo}>Timman</Link>}
        </Col>
        <Col>
          <Popover
            placement="bottomRight"
            content={
              <Button onClick={handleLogout}>Logout</Button>
            }
            title={props.name}
            trigger="click"
            visible={visible}
            onVisibleChange={setVisible}
          >
            <span className={styles.header__profile}>{props.name}</span>
          </Popover>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default connect(
  state => {
    const {name} = state.authReducer;

    return {name};
  },
  dispatch => ({
    logout: () => authActions.logout().then(result => dispatch(result)),
    clearFiles: () => documentsActions.clear().then(result => dispatch(result)),
    clearNotes: () => notesActions.clear().then(result => dispatch(result))
  })
)
(Header);