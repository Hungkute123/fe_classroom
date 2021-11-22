import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { BsKeyFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { SiGmail } from 'react-icons/si';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getInfo, loginWithEmail } from '../../redux/slice/appSlice/accountSlice';
import { useAppDispatch } from '../../redux/store';
import './Login.scss';

export const Login = () => {
  const dispatch = useAppDispatch();
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    const account = {
      Email: e.target[0].value,
      Password: e.target[1].value,
    };

    const isLogin = (await dispatch(loginWithEmail(account))).payload;

    if (isLogin) {
      Swal.fire({
        icon: 'success',
        title: 'ĐĂNG NHẬP THÀNH CÔNG',
      });

      dispatch(getInfo({ jwt: localStorage.getItem('jwt') }));

      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'ĐĂNG NHẬP THẤT BẠI',
    });
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__title">
          <h1>ClassRoom</h1>
        </div>
        <div className="login__form">
          <Form onSubmit={handleSubmitForm}>
            <div className="login__group">
              <input type="email" name="email" placeholder="Nhập E-mail" required />
              <span className="login__icon">
                <MdEmail></MdEmail>
              </span>
            </div>
            <div className="login__group">
              <input type="password" name="password" placeholder="Nhập Password" required />
              <span className="login__icon">
                <BsKeyFill></BsKeyFill>
              </span>
            </div>
            <button className="login__btn">Đăng Nhập</button>
          </Form>
          <Link to="" className="login__forgot">
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
            <Button variant="info">
              <SiGmail></SiGmail>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
