import React from 'react';
import { Form } from 'react-bootstrap';
import { BsFillPencilFill, BsKeyboardFill, BsKeyFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LoginWithGoogle } from '..';
import { registerWithEmail } from '../../redux/slice/appSlice/accountSlice';
import { useAppDispatch } from '../../redux/store';
import './Register.scss';

export const Register = () => {
  const dispatch = useAppDispatch();
  const listRegister = [
    {
      id: 'register-email',
      name: 'register-email',
      type: 'email',
      content: 'Nhập Email',
      icon: <MdEmail></MdEmail>,
    },
    {
      id: 'register-name',
      name: 'register-name',
      type: 'text',
      content: 'Nhập Họ Và tên',
      icon: <BsFillPencilFill></BsFillPencilFill>,
    },
    {
      id: 'register-password',
      name: 'register-password',
      type: 'password',
      content: 'Nhập Password',
      icon: <BsKeyFill></BsKeyFill>,
    },
    {
      id: 'register-rePassword',
      name: 'register-rePassword',
      type: 'password',
      content: 'Nhập Lại Password',
      icon: <BsKeyboardFill></BsKeyboardFill>,
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const account = {
      Email: e.target[0].value,
      Name: e.target[1].value,
      Password: e.target[2].value,
      Repassword: e.target[3].value,
    };

    if (account.Password != account.Repassword) {
      Swal.fire({
        icon: 'error',
        title: 'MẬT KHẨU KHÔNG TRÙNG KHỚP',
      });

      return;
    }

    const isRegister = (await dispatch(registerWithEmail(account))).payload;

    if (isRegister) {
      Swal.fire({
        icon: 'success',
        title: 'ĐĂNG KÝ THÀNH CÔNG',
      });

      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'EMAIL ĐÃ TỒN TẠI',
    });
  };

  return (
    <div className="register">
      <div className="register__content">
        <div className="register__title">
          <h1>ClassRoom</h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="register__form">
            {listRegister.map((item, moves) => {
              return (
                <div className="register__group" key={moves}>
                  <input
                    type={item.type}
                    name={item.name}
                    placeholder={item.content}
                    id={item.id}
                    required
                  />
                  <span className="register__icon">{item.icon}</span>
                </div>
              );
            })}
            <button className="register__btn" type="submit">
              Đăng Ký
            </button>
            <div className="register__seperator">
              <b>OR</b>
            </div>
            <p className="register__register-social">
              <Link to="/account/login" style={{ fontSize: '16px', color: '#45aba6' }}>
                Quay lại trang đăng nhập
              </Link>
              <> hoặc đăng nhập bằng nền tảng khác</>
            </p>
            <div className="register__social">
              <LoginWithGoogle></LoginWithGoogle>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
