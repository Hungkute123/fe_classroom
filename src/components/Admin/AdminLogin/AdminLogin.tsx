import React from 'react';
import { Form } from 'react-bootstrap';
import { BsKeyFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { getInfo, loginWithEmail } from '../../../redux/slice/appSlice/accountSlice';
import { useAppDispatch } from '../../../redux/store';

import './AdminLogin.scss';

export const AdminLogin = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
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
        history.push({
          pathname: `/admin/manage-user-accounts`,
        });
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

  return (
    <div className="admin-login">
      <div className="admin-login__content">
        <div className="admin-login__title">
          <h1>Classroom Admin</h1>
        </div>
        <div className="admin-login__form">
          <Form onSubmit={handleSubmitForm}>
            <div className="admin-login__group">
              <input type="email" name="email" placeholder="Nhập E-mail" required />
              <span className="admin-login__icon">
                <MdEmail></MdEmail>
              </span>
            </div>
            <div className="admin-login__group">
              <input type="password" name="password" placeholder="Nhập Password" required />
              <span className="admin-login__icon">
                <BsKeyFill></BsKeyFill>
              </span>
            </div>
            <button className="admin-login__btn">Đăng Nhập</button>
          </Form>
          <Link to="" className="admin-login__forgot">
            Quên mật khẩu
          </Link>
        </div>
      </div>
    </div>
  );
};
