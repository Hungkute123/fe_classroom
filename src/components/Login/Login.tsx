import React from 'react';
import './Login.scss';

import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="login">
      <div className="login__content">
        <div className="login__title">
          <h1>Login</h1>
        </div>
        <div className="login__form">
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text id="email">Email</InputGroup.Text>
              <FormControl
                placeholder="Nhập Email"
                aria-label="Nhập Email"
                aria-describedby="email"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="password">Password</InputGroup.Text>
              <FormControl
                placeholder="Nhập Password"
                aria-label="Nhập Password"
                aria-describedby="password"
              />
            </InputGroup>
            <Button variant="info">Đăng Nhập</Button>
          </Form>
          <div className="login__forgot">
            <p>Quên mật khẩu</p>
          </div>
          <div className="login__seperator">
            <b>OR</b>
          </div>
          <div className="login__social">
            <Button variant="info">Info</Button>
            <Button variant="info">Info</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
