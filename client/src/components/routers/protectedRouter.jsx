import React from 'react';
import {
  Switch, Router, Route,
} from 'react-router-dom';
import RedirectRoute from './redirectRouter';
import history from '../../utils/history';
import ProductsComponent from '../pages/products';
import ProductComponent from '../pages/products/components/product_view';
import ProductCreateComponent from '../pages/products/components/product_create';
import { Layout, Row, Col } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { MenuComponent } from '../shared/menu';

const { Header, Content, Footer, Sider } = Layout;
const layoutStyle = {
  height: "100%"
}

const ProtectedRouter = () => (

<Router history={history}>
  <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
    <div style={{
      height: "32px",
      background: "white",
      margin: "16px",
    }} />
    <MenuComponent />
    </Sider>
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Switch>
            <RedirectRoute path={['/sign-in', '/sign-up']} to="/" />
            <Route exact path="/" component={ProductsComponent} />
            <Route exact path="/products" component={ProductsComponent} />
            <Route exact path="/products/create" component={ProductCreateComponent} />
            <Route exact path="/products/:productId" component={ProductComponent} />
          </Switch>
          </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
</Router>
);

export default ProtectedRouter;
