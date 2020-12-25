import React from 'react';
import { Menu } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../redux/actions/user';
import history from '../../../utils/history';

const { SubMenu } = Menu;

export default () => {
  const dispatch = useDispatch();
  return (
    <Menu
      defaultOpenKeys={['sub1']}
      style={{ height: 'calc(100% - 60px)' }}
      mode="inline"
      forceSubMenuRender={false}
    >
      <SubMenu key="sub1" icon={<MailOutlined />} title="Products">
        <Menu.Item key="1"><Link to="/products">List</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/products/create">New product</Link></Menu.Item>
      </SubMenu>
      <Menu.Item key="9" onClick={() => { dispatch(signOut()); history.push('/sign-in'); }}>Log out</Menu.Item>
    </Menu>
  );
};
