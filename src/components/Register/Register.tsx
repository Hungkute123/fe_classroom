import React from 'react';
import './Register.scss';

import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { MdEmail } from 'react-icons/md';
import { BsKeyFill } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <div className="login">
      <div className="login__content">
        <div className="login__title">
          <h1>ClassRoom</h1>
        </div>
        <div className="login__form">
          <Form>
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
            <Link to="/" style={{ fontSize: '16px', color: '#45aba6' }}>
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
