import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getInfo } from "../redux/slice/appSlice/accountSlice";
import { RootState, useAppDispatch } from "../redux/store";

export const PublicRouter: React.FC<IPublicRouter> = ({
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
}) => {
  let query = new URLSearchParams(useLocation().search).get("text");
  
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
                  titleDynamic={query}
                  type={typeHeader}
                  onClick={props.history.goBack}
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
