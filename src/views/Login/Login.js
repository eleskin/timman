import React, {useState} from 'react';
import styles from './Login.module.css';
import {Link} from 'react-router-dom';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import authActions from '../../utils/auth/authActions';
import documentsActions from '../../utils/documents/documentsActions';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember_me, setRememberMe] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    await props.login({email, password, remember_me});
    await props.getFiles();
  };

  return (
    <div className={styles.login}>
      <Container fluid>
        <Row className="justify-content-center">
          <Col>
            <h1>Sign in</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="3">
            <Form className={styles.login__form} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  checked={remember_me}
                  onChange={() => setRememberMe(!remember_me)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Sign in
              </Button>

            </Form>
            <div>Not a member? <Link to="/register">Sign up</Link></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(
  state => {
    const {documents} = state.documentsReducer;

    return {documents};
  },
  dispatch => ({
    login: data => authActions.login(data).then(result => dispatch(result)),
    getFiles: () => documentsActions.getFiles().then(result => dispatch(result)),
  })
)
(Login);