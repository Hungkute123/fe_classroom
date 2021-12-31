import React, { useEffect, useState } from 'react';
import './AdminHome.scss';
import { Row, Col, Container } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../redux/rootReducer';
import { IntlProvider } from 'react-intl';
import {
  AdminLogin,
  CreateAdminAccount,
  ManageAdminAccounts,
  ManageClasses,
  ManageUserAccounts,
  SidebarAdmin,
} from '../../components';

export const AdminHome = () => {
  const history = useHistory();
  const [kindScreen, setKindScreen] = useState('');
  const location = useLocation();
  const { account } = useSelector((state: RootState) => state);
  const [locale, setLocale] = useState('en');
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);
  useEffect(() => {
    if (location.pathname === '/admin/manage-admin-accounts') setKindScreen('ManageAdminAccounts');
    if (location.pathname === '/admin/manage-user-accounts') setKindScreen('ManageUserAccounts');
    if (location.pathname === '/admin/manage-classes') setKindScreen('ManageClasses');
    if (location.pathname === '/admin/create-admin-account') setKindScreen('CreateAdminAccount');
  }, [location]);

  const renderBody = (kind: string) => {
    switch (kind) {
      case 'ManageAdminAccounts':
        return <ManageAdminAccounts />;
      case 'ManageUserAccounts':
        return <ManageUserAccounts />;
      case 'ManageClasses':
        return <ManageClasses />;
      case 'CreateAdminAccount':
        return <CreateAdminAccount />;
      default:
        return <></>;
    }
  };
  return (
    <IntlProvider locale={locale}>
      <div className={` admin-home app-sidebar ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
        <SidebarAdmin />
        <main>{renderBody(kindScreen)}</main>
      </div>
    </IntlProvider>
  );
};
