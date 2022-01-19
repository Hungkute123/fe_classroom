import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
// import { doGetCurrentUser } from '../redux/slice';
// import { EToken } from '../constants/login';
// import { logout } from '../helpers/app';
// import { readCookie } from '../helpers/login';
import { useAppDispatch } from '../redux/store';
import { getInfo } from '../redux/slice/appSlice/accountSlice';
import { RootState } from '../redux/rootReducer';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { directive } from '@babel/types';
import { Spinner } from 'react-bootstrap';
import { LoadingView } from '../components';

export const PrivateRouter: React.FC<IPrivateRouter> = ({
  component: Component,
  layout: Layout,
  exact,
  path,
  header: Header,
  footer: Footer,
  isHasFooter,
  isHasHeader,
  titleHeader,
  typeHeader,
  isHasGradiant,
  backPath,
  withoutAvatar,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  const [isFetch, setIsFectch] = useState(false);
  const { isAccount, account } = useSelector((state: RootState) => state.account);
  const fecthInfo = async () => {
    const check = (await dispatch(getInfo({ jwt: localStorage.getItem('jwt') }))).payload;
    if (check === true || check === false || String(typeof check) === 'object') {
      setIsFectch(true);
    }
  };
  useEffect(() => {
    fecthInfo();
    return () => {};
  }, [location]);

  const render = (props: any) => {
    if (
      (isAccount == 'true' && location === '/account/register') ||
      (isAccount == 'true' && location === '/account/forgot-password')
    ) {
      return <Redirect to="/" />;
    }
    if (
      account.Permission === 'User' &&
      (location === '/admin/create-admin-account' ||
        location === '/admin/manage-admin-accounts' ||
        location === '/admin/manage-user-accounts' ||
        location === '/admin/manage-classes')
    ) {
      return <Redirect to="/" />;
    }
    if (
      isAccount == 'false' &&
      location != '/account/login' &&
      location != '/account/register' &&
      location != '/account/forgot-password'
    ) {
      return <Redirect to="/account/login" />;
    }

    return isFetch == false ? (
      <LoadingView></LoadingView>
    ) : (
      <Layout
        header={
          isHasHeader ? (
            <Header
              title={titleHeader}
              type={typeHeader}
              onClick={props.history.goBack}
              path={backPath}
              withoutAvatar={withoutAvatar}
            />
          ) : (
            <></>
          )
        }
        footer={isHasFooter ? <Footer /> : <></>}
      >
        <Component {...props} />
      </Layout>
    );
  };

  return <Route exact={exact} path={path} render={render} />;
};
