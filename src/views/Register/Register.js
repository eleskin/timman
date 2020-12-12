import React from 'react';
import styles from './Register.module.css';
import {Button, Col, Form, Input, Row} from 'antd';
import {Link} from 'react-router-dom';

const Register = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.register}>
      <Row>
        <Col span={6} offset={9}><h2>Register</h2></Col>
      </Row>
      <Row>
        <Col span={6} offset={9}>
          <Form
            name="register"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles.register__form}
          >
            <Form.Item
              name="name"
              rules={[{required: true, message: 'Please input your name!'}]}
            >
              <Input placeholder="Your name"/>
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{required: true, message: 'Please input your email!', type: 'email'}]}
            >
              <Input placeholder="Your email"/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input.Password placeholder="Create password"/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create account
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/login">Already a member? Sign In</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;