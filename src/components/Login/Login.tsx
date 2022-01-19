import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { BsKeyFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

import { getInfo, loginWithEmail } from '../../redux/slice/appSlice/accountSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { LoginWithGoogle } from '..';

import './Login.scss';
import { useSelector } from 'react-redux';

export const Login = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  const { isAccount } = useSelector((state: RootState) => state.account);
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    const account = {
      Email: e.target[0].value,
      Password: e.target[1].value,
    };

    const isLogin = (await dispatch(loginWithEmail(account))).payload;
   

    if (isLogin) {
      const data = (await dispatch(getInfo({ jwt: localStorage.getItem('jwt') }))).payload;
      
      if (!data.Status) {
        window.localStorage.clear();
        Swal.fire({
          icon: 'error',
          title: 'TÀI KHOẢN ĐÃ BỊ KHÓA',
        });
      } else {
        if (history.action === 'PUSH') {
          history.goBack();
        } else {
          history.push({
            pathname: `/`,
          });
        }
        Swal.fire({
          icon: 'success',
          title: 'ĐĂNG NHẬP THÀNH CÔNG',
        });

        return;
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ĐĂNG NHẬP THẤT BẠI',
      });
      return;
    }
  };
  const handleLogged = () => {
    if (isAccount == 'true' && location === '/account/login') {
      return <Redirect to="/" />;
    }
  };
  useEffect(() => {
    handleLogged();
  }, []);
  return (
    <div className="login">
      <div className="login__content">
        <div className="login__title">
          <h1>ClassRoom</h1>
        </div>
        <div className="login__form">
          <Form onSubmit={handleSubmitForm}>
            <div className="login__group">
              <input
                type="email"
                id="login-email"
                name="login-email"
                placeholder="Nhập E-mail"
                required
              />
              <span className="login__icon">
                <MdEmail></MdEmail>
              </span>
            </div>
            <div className="login__group">
              <input
                type="password"
                id="login-password"
                name="login-password"
                placeholder="Nhập Password"
                required
              />
              <span className="login__icon">
                <BsKeyFill></BsKeyFill>
              </span>
            </div>
            <button className="login__btn">Đăng Nhập</button>
          </Form>
          <Link to="/account/forgot-password" className="login__forgot">
            Quên mật khẩu
          </Link>
          <div className="login__seperator">
            <b>OR</b>
          </div>
          <p className="login__login-social">
            <Link to="/account/register" style={{ fontSize: '16px', color: '#45aba6' }}>
              Đăng ký{' '}
            </Link>
            hoặc đăng nhập bằng nền tảng khác
          </p>
          <div className="login__social">
            <LoginWithGoogle></LoginWithGoogle>
          </div>
        </div>
      </div>
    </div>
  );
};
