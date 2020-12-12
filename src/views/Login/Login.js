import React from 'react';
import styles from './Login.module.css';
import {Link} from 'react-router-dom';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';


const Login = () => {
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
            <Form className={styles.login__form}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password"/>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
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

export default Login;