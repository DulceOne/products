import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useDispatch } from 'react-redux'
import { signIn } from '../../../redux/actions/user';
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

const SignInComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = values => {
    dispatch(signIn(values));
  };
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
              Log in
                  </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default SignInComponent;
