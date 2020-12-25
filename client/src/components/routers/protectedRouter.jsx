import React from 'react';
import {
  Switch, Router, Route,
} from 'react-router-dom';
import { Layout } from 'antd';
import { useMediaQuery } from 'react-responsive';
import RedirectRoute from './redirectRouter';
import history from '../../utils/history';
import ProductsComponent from '../pages/products';
import ProductComponent from '../pages/products/components/product_edit';
import ProductCreateComponent from '../pages/products/components/product_create';
import MenuComponent from '../shared/menu';

const {
  Header,
  Content,
  Footer,
  Sider,
} = Layout;
const { REACT_APP_NAME: appName, REACT_APP_FOOTER_CONTENT: footerContent } = process.env;

const siderStyle = {
  position: 'fixed',
  height: '100%',
  zIndex: '1',
};

const ProtectedRouter = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });

  return (
    <Router history={history}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={isDesktopOrLaptop ? {} : siderStyle}
        >
          <div style={{
            fontSize: 24,
            color: 'white',
            padding: 13,
          }}
          >
            {appName}
          </div>
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
          <Footer style={{ textAlign: 'center' }}>{footerContent}</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default ProtectedRouter;
