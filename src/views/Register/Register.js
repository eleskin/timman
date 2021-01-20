import React from 'react';
import styles from './Register.module.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import authActions from '../../utils/auth/authActions';
import documentsActions from '../../utils/documents/documentsActions';
import {Button, Col, Form, Input, Row, Typography} from 'antd';
import {LockOutlined, UserOutlined, MailOutlined} from '@ant-design/icons';

const {Title} = Typography;

const Register = props => {
  const onFinish = async values => {
    await props.register(values);
    await props.getFiles();
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__wrapper}>
        <Row>
          <Col
            xxl={{span: 4, offset: 10}}
            xl={{span: 6, offset: 9}}
            lg={{span: 8, offset: 8}}
            md={{span: 10, offset: 7}}
            sm={{span: 14, offset: 5}}
            xs={{span: 24, offset: 0}}
          >
            <Title level={3}>Sign up</Title>
          </Col>
        </Row>
        <Row>
          <Col
            xxl={{span: 4, offset: 10}}
            xl={{span: 6, offset: 9}}
            lg={{span: 8, offset: 8}}
            md={{span: 10, offset: 7}}
            sm={{span: 14, offset: 5}}
            xs={{span: 24, offset: 0}}
          >
            <Form
              name="normal_register"
              className="register-form"
              initialValues={{remember: true}}
              onFinish={onFinish}
            >
              <Form.Item name="name">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon"/>}
                  type="text"
                  placeholder="Your name"
                  required
                />
              </Form.Item>
              <Form.Item name="email">
                <Input
                  prefix={<MailOutlined className="site-form-item-icon"/>}
                  type="email"
                  placeholder="Your email"
                  required
                />
              </Form.Item>
              <Form.Item name="password">
                <Input
                  prefix={<LockOutlined className="site-form-item-icon"/>}
                  type="password"
                  placeholder="Create password"
                  required
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
                  Create account
                </Button>
                Already a member? <Link to="/login">Sign In</Link>
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
    register: data => authActions.register(data).then(result => dispatch(result)),
    getFiles: () => documentsActions.getFiles().then(result => dispatch(result)),
  })
)
(Register);