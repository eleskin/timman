import React, {useState} from 'react';
import styles from './Register.module.css';
import {Link} from 'react-router-dom';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';

const Register = () => {
  // const [name, setName] = useState('gfsd');

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
            <Form className={styles.register__form}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Your name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name"/>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password"/>
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

export default Register;