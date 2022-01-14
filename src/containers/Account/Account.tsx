import React from 'react';
import { useLocation } from 'react-router';

import { Login, Register, ForgotPassword } from '../../components';

export const Account = () => {
  const location = useLocation();

  switch (location.pathname) {
    case '/account/login':
      return <Login></Login>;
      break;
    case '/account/register':
      return <Register></Register>;
      break;
    case '/account/forgot-password':
      return <ForgotPassword></ForgotPassword>;
      break;
    default:
      return <div></div>;
  }
};
