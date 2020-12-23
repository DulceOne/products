import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

export const  MenuComponent = () => {
    return (
        <Menu
          defaultOpenKeys={['sub1']}
          style={{ height: "calc(100% - 60px)" }}
          mode="inline"
        >
          <SubMenu key="sub1" icon={<MailOutlined />} title="Products">
            <Menu.Item key="1"><Link to="/products">List</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/products/create">New product</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Profile">
            <Menu.Item key="5">Settings</Menu.Item>
            <Menu.Item key="6">View</Menu.Item>
          </SubMenu>
            <Menu.Item key="9">Log out</Menu.Item>
        </Menu>
      );
  
}
    