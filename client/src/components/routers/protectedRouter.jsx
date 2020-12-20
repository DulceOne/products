import React from 'react';
import {
  Switch, Router, Route,
} from 'react-router-dom';
import RedirectRoute from './redirectRouter';
import history from '../../utils/history';
import ProductsComponent from '../pages/products';
import ProductComponent from '../pages/products/components/product_view';
import { Layout, Row, Col } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { MenuComponent } from '../shared/menu';

const { Header, Content, Footer, Sider } = Layout;
const layoutStyle = {
  height: "100%"
}

const ProtectedRouter = () => (
  // <Layout style={layoutStyle}>
  //     <Sider
  //       breakpoint="lg"
  //       collapsedWidth="0"
  //       onBreakpoint={broken => {
  //         console.log(broken);
  //       }}
  //       onCollapse={(collapsed, type) => {
  //         console.log(collapsed, type);
  //       }}
  //     ></Sider>
  //       <MenuComponent />
  //       <Layout>
  //       <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
  //       <Content style={{ margin: '24px 16px 0' }}>
  //         <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
  //           <Router history={history}>
  //           <Switch>
  //             <RedirectRoute path={['/sign-in', '/sign-up']} to="/" />
  //             <Route exact path="/" component={ProductsComponent} />
  //             <Route exact path="/products" component={ProductsComponent} />
  //             <Route exact path="/products/:productId" component={ProductComponent} />
  //           </Switch>
  //         </Router>
  //         </div>
  //       </Content>
  //       <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  //     </Layout>
      
  // </Layout>

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
      <Router history={history}>
        <Switch>
          <RedirectRoute path={['/sign-in', '/sign-up']} to="/" />
          <Route exact path="/" component={ProductsComponent} />
          <Route exact path="/products" component={ProductsComponent} />
          <Route exact path="/products/:productId" component={ProductComponent} />
        </Switch>
      </Router>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
</Layout>
);

export default ProtectedRouter;
