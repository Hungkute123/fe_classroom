import React from 'react';
import { Form } from 'react-bootstrap';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { getInfo } from '../../redux/slice/appSlice/accountSlice';
import userApi from '../../services/aixos/accountApi';

import './ForgotPassword.scss';

export const ForgotPassword = () => {
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    const email = e.target[0].value;
    const isUpdatePassword = await userApi.forgotPassword({ email: email });

    if (isUpdatePassword.data) {
      Swal.fire({
        icon: 'success',
        title: 'HỆ THỐNG ĐÃ GỬI MẬT KHẨU MỚI ĐẾN EMAIL CỦA BẠN',
      });

      return;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'TÀI KHOẢN KHÔNG TỒN TẠI',
      });
      return;
    }
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password__content">
        <div className="forgot-password__title">
          <h1>ClassRoom</h1>
        </div>
        <div className="forgot-password__form">
          <Form onSubmit={handleSubmitForm}>
            <div className="forgot-password__group">
              <input
                type="email"
                id="forgot-email"
                name="forgot-email"
                placeholder="Nhập E-mail"
                required
              />
              <span className="forgot-password__icon">
                <MdEmail></MdEmail>
              </span>
            </div>
            <button className="forgot-password__btn">Quên mật khẩu</button>
          </Form>
          <div className="forgot-password__seperator">
            <b>OR</b>
          </div>
          <p className="forgot-password__login-social">
            <Link to="/account/login" style={{ fontSize: '16px', color: '#45aba6' }}>
              Đăng nhập{' '}
            </Link>
            <> hoặc </>
            <Link to="/account/register" style={{ fontSize: '16px', color: '#45aba6' }}>
              Đăng ký{' '}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
