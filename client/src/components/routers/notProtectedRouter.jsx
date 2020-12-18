import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignInComponent from '../auth/sign-in/index';
import SignUpComponent from '../auth/sign-up/index';

const NotAuthorizedRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={['/', '/sign-in']} component={SignInComponent} />
      <Route exact path={['/sign-up']} component={SignUpComponent} />
    </Switch>
  </BrowserRouter>
);

export default NotAuthorizedRouter;
