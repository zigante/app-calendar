import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Monthly from './pages/Monthly';

const Router = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Redirect to="/" from="/home" />
          <Route path="/" exact component={Monthly} />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
};

export default Router;
