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
        <PrivateRouter
          exact={true}
          path={'/account/log-out'}
          component={Account}
          layout={BlankLayout}
          titleHeader="Đăng ký"
        />
      </Switch>
      <Switch>
        <PrivateRouter
          exact={true}
          path={'/user/info'}
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
<<<<<<< HEAD
          path={'/user/password'}
          component={User}
          layout={HeaderFooterLayout}
          isHasHeader={true}
          header={Header}
          titleHeader="Đổi mật khẩu"
          isHasFooter={true}
          footer={Footer}
        />
        <PrivateRouter
          exact={true}
          path={'/user/mssv'}
          component={User}
          layout={HeaderFooterLayout}
          isHasHeader={true}
          header={Header}
          titleHeader="Đổi mã số sinh viên"
=======
          path={'/myclassroom/:codeclass'}
          component={MyClassroom}
          layout={HeaderFooterLayout}
          isHasHeader={true}
          header={Header}
          titleHeader="Cộng đồng"
>>>>>>> bff13f8e5dd1b0536c7e76ea3d0b2bb600da811c
          isHasFooter={true}
          footer={Footer}
        />
      </Switch>
    </Router>
  );
};
