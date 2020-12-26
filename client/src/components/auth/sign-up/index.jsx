import React from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
} from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import hadlers from './handlers';

const formWrapperStyle = {
  height: '100%',
};

const SignUpComponent = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });

  const onFinish = (form) => {
    hadlers(form, props.history);
  };

  return (
    <Row align="middle" style={formWrapperStyle}>
      <Col span={12} offset={6}>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} name="basic" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: isDesktopOrLaptop ? 8 : 0, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
            <span style={{ margin: '0px 10px' }}>or</span>
            <Link to="/sign-in">Sign in</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

SignUpComponent.propTypes = {
  history: PropTypes.arrayOf(),
};

SignUpComponent.defaultProps = {
  history: [],
};

export default SignUpComponent;
