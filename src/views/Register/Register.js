import React, {useState} from 'react';
import styles from './Register.module.css';
import {Link} from 'react-router-dom';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import authActions from '../../utils/auth/authActions';

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.register({name, email, password});
  };

  return (
    <div className={styles.register}>
      <Container fluid>
        <Row className="justify-content-center">
          <Col>
            <h1>Sign up</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="3">
            <Form className={styles.register__form} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </Form.Group>

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

              <Button variant="primary" type="submit" block>
                Create account
              </Button>

            </Form>
            <div>Already a member? <Link to="/login">Sign in</Link></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(
  null,
  dispatch => ({
    register: data => authActions.register(data).then(result => dispatch(result))
  })
)
(Register);