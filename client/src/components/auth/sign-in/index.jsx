import React from 'react';
import { Form, Input, Button, Row, Col, Spin  } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../../redux/actions/user';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const formWrapperStyle = {
  height: "100%"
}

const spinStyle = {
  marginLeft: "15px"
}

const SignInComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.user);

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
            <Button type="primary" htmlType="submit" disabled={loading}>
              Log in
            </Button>
            {loading ? <Spin style={spinStyle} /> : null}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default SignInComponent;
