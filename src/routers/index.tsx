import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { BlankLayout, HeaderFooterLayout, OnlyFooterLayout, OnlyHeaderLayout } from '../layouts';
import { Home, Account, MyClassroom, User } from '../containers';
import { Header, Footer } from '../components/common';


export const Routers = () => {
  const buildysURL = process.env.REACT_APP_LINK_BUILDYS;

  return (
    <Router>
      <Switch>
        <PrivateRouter
          exact={true}
          path={'/'}
          component={Home}
          layout={HeaderFooterLayout}
          isHasHeader={true}
          header={Header}
          titleHeader="Cộng đồng"
          isHasFooter={true}
          footer={Footer}
        />
        <PrivateRouter
          exact={true}
          path={'/account/login'}
          component={Account}
          layout={BlankLayout}
          titleHeader="Đăng nhập"
        />
        <PrivateRouter
          exact={true}
          path={'/account/register'}
          component={Account}
          layout={BlankLayout}
          titleHeader="Đăng ký"
        />
      </Switch>
      <Switch>
      <PrivateRouter
          path={'/user'}
          component={User}
          layout={HeaderFooterLayout}
          isHasHeader={true}
          header={Header}
          titleHeader="Thông tin cá nhân"
          isHasFooter={true}
          footer={Footer}
        />
        <PrivateRouter
          exact={true}
          path={'/myclassroom/:codeclass'}
          component={MyClassroom}
          layout={HeaderFooterLayout}
          isHasHeader={true}
          header={Header}
          titleHeader="Cộng đồng"
          isHasFooter={true}
          footer={Footer}
        />
      </Switch>
    </Router>
  );
};
