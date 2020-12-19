import React from 'react';
import {
  Switch, Router, Route,
} from 'react-router-dom';
import RedirectRoute from './redirectRouter';
import history from '../../utils/history';
import ProductsComponent from '../pages/products';
import ProductComponent from '../pages/products/components/product_view';
import { Layout } from 'antd';
const { Header } = Layout;

const ProtectedRouter = () => (
  <Layout>
    <Header>header</Header>
    <Router history={history}>
      <Switch>
        <RedirectRoute path={['/sign-in', '/sign-up']} to="/" />
        <Route exact path="/" component={ProductsComponent} />
        <Route exact path="/products" component={ProductsComponent} />
        <Route exact path="/products/:productId" component={ProductComponent} />
      </Switch>
    </Router>
  </Layout>

);

export default ProtectedRouter;
