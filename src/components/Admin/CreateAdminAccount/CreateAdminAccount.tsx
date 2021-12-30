import React from 'react';
import { Form } from 'react-bootstrap';
import { BsFillPencilFill, BsKeyboardFill, BsKeyFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registerWithEmail } from '../../../redux/slice/appSlice/accountSlice';
import { useAppDispatch } from '../../../redux/store';
import './CreateAdminAccount.scss';

export const CreateAdminAccount = () => {
  const dispatch = useAppDispatch();
  const listRegister = [
    {
      name: 'email',
      type: 'email',
      content: 'Nhập Email',
      icon: <MdEmail></MdEmail>,
    },
    {
      name: 'name',
      type: 'text',
      content: 'Nhập Họ Và tên',
      icon: <BsFillPencilFill></BsFillPencilFill>,
    },
    {
      name: 'password',
      type: 'password',
      content: 'Nhập Password',
      icon: <BsKeyFill></BsKeyFill>,
    },
    {
      name: 'rePassword',
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
    <div className="create-admin-account">
      <div className="create-admin-account box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="create-admin-account box content">
          <div className="create-admin-account__content">
            <div className="create-admin-account__title">
              <h1>Tạo tài khoản admin</h1>
            </div>
            <Form onSubmit={handleSubmit}>
              <div className="create-admin-account__form">
                {listRegister.map((item, moves) => {
                  return (
                    <div className="create-admin-account__group" key={moves}>
                      <input
                        type={item.type}
                        name={item.name}
                        placeholder={item.content}
                        required
                      />
                      <i className="create-admin-account__icon">{item.icon}</i>
                    </div>
                  );
                })}
                <button className="create-admin-account__btn" type="submit">
                  Tạo tài khoản
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
