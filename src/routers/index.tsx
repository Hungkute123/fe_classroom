import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { BlankLayout, HeaderFooterLayout, OnlyFooterLayout, OnlyHeaderLayout } from '../layouts';
import { Home, Account, MyClassroom, User, MyListMemberClass, InviteClass, GradeStructure } from '../containers';
import { Header, Footer, HeaderClassroom } from '../components/common';

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
          titleHeader="Classroom"
          isHasFooter={true}
          footer={Footer}
        />
        <PrivateRouter
          path={'/account/login'}
          component={Account}
          layout={BlankLayout}
          titleHeader="Đăng nhập"
        />
        <PrivateRouter
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
          titleHeader="Đăng xuất"
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
          isHasFooter={true}
          footer={Footer}
        />
      </Switch>
      <Switch>
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
        <PrivateRouter
          exact={true}
          path={'/myclassroom/:codeclass/:number/antbntig'}
          component={MyClassroom}
          layout={HeaderFooterLayout}
          isHasHeader={true}
          header={HeaderClassroom}
          titleHeader="Bảng tin"
          isHasFooter={true}
          footer={Footer}
        />
        <PrivateRouter
          exact={true}
          path={'/myclassroom/:codeclass/:number/omiuniguo'}
          component={MyListMemberClass}
          layout={HeaderFooterLayout}
          isHasHeader={true}
          header={HeaderClassroom}
          titleHeader="Mọi người"
          isHasFooter={true}
          footer={Footer}
        />
        <PrivateRouter
          exact={true}
          path={'/invite'}
          component={InviteClass}
          layout={BlankLayout}
          titleHeader="Tham gia lớp học"
        />
        <PrivateRouter
          exact={true}
          path={'/myclassroom/:codeclass/grade'}
          component={GradeStructure}
          layout={BlankLayout}
          titleHeader="Tham gia lớp học"
        />
      </Switch>
    </Router>
  );
};
