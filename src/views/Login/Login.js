import React from 'react';
import styles from './Login.module.css';
import {Button, Checkbox, Col, Form, Input, Row} from 'antd';
import {Link} from 'react-router-dom';


const Login = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.login}>
      <Row>
        <Col span={6} offset={9}><h2>Login</h2></Col>
      </Row>
      <Row>
        <Col span={6} offset={9}>
          <Form
            name="login"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles.login__form}
          >
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
              <Input.Password placeholder="Your password"/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Sign in
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/register">Not a member? Sign up now</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;