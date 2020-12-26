import React from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Spin,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { signIn } from '../../../redux/actions/user';

const formWrapperStyle = {
  height: '100%',
};

const spinStyle = {
  marginLeft: '15px',
};

const SignInComponent = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });

  const onFinish = (values) => {
    dispatch(signIn(values));
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
            <Button type="primary" htmlType="submit" disabled={loading}>
              Log in
            </Button>
            <span style={{ margin: '0px 10px' }}>or</span>
            <Link to="/sign-up">Sign up</Link>
            {loading ? <Spin style={spinStyle} /> : null}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignInComponent;
