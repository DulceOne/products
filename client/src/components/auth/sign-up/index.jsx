import React from 'react';
import { Form, Input, Button, Checkbox, Layout, Row, Col } from 'antd';

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
    return (
        <Row align="middle" style={formWrapperStyle}>
          <Col span={12} offset={6}>
            <Form { ...layout } name="basic">
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
