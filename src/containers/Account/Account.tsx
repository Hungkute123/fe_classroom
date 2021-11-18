import React from 'react';
import { useLocation } from 'react-router';

import { Login } from '../../components';

export const Account = () => {
  const location = useLocation();

  switch (location.pathname) {
    case '/account/login':
      return <Login></Login>;
      break;
    default:
      return <div></div>;
  }
};
