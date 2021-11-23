import React, { useEffect } from 'react';
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
  const { isAccount, account } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    dispatch(getInfo({ jwt: localStorage.getItem('jwt') }));
    return () => {
      console.log('isAccount:', isAccount);
    };
  }, [location]);

    
    if (
      (isAccount == "true" && location === '/account/login') ||
      (isAccount == "true" && location === '/account/register')
    ) {
      return (
        <Route>
          <Redirect to="/" />
        </Route>
      );
    }

    if (isAccount == "false" && location != '/account/login' && location != '/account/register') {
      return (
        <Route>
          <Redirect to="/account/login" />
        </Route>
      );
    }
  
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        return (
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
      }}
    />
  );
};
