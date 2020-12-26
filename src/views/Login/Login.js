import React from 'react';
import styles from './Login.module.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import authActions from '../../utils/auth/authActions';
import documentsActions from '../../utils/documents/documentsActions';
import {Button, Checkbox, Col, Form, Input, Row, Typography} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

const {Title} = Typography;

const Login = props => {
  const onFinish = async values => {
    await props.login(values);
    await props.getFiles();
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__wrapper}>
        <Row>
          <Col span={6} offset={9}>
            <Title level={3}>Sign in</Title>
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={9}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{remember: true}}
              onFinish={onFinish}
            >
              <Form.Item name="email">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon"/>}
                  type="email"
                  placeholder="Email"
                  required
                />
              </Form.Item>
              <Form.Item name="password">
                <Input
                  prefix={<LockOutlined className="site-form-item-icon"/>}
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Item>
              <Form.Item>
                <Row flex="true" justify="space-between">
                  <Form.Item name="remember_me" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Link className="login-form-forgot" to="">
                    Forgot password
                  </Link>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
                  Log in
                </Button>
                Or <Link to="/register">register now!</Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
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