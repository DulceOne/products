import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import * as hadlers from './handlers';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const formWrapperStyle = {
  height: "100%"
}
const SignUpComponent = () => {
  const onFinish = (form) => {
    hadlers.signup(form);
  }
    return (
        <Row align="middle" style={formWrapperStyle}>
          <Col span={12} offset={6}>
            <Form { ...layout } name="basic" onFinish={onFinish}>
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
    
              <Form.Item { ...tailLayout }>
                <Button type="primary" htmlType="submit">
                  Sign up
                      </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )
}

export default SignUpComponent;
