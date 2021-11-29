import React from 'react';
import './User.scss';

import { UserNav, UserBody } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useAppDispatch } from '../../redux/store';
import { updateAccount, updatePass, updateMSSV } from '../../redux/slice/appSlice/accountSlice';

export const User = () => {
  const account: any = useSelector((state: RootState) => state.account.account);
  const location = useLocation().pathname;
  const listInfo = [
    {
      md: 6,
      label: 'Họ tên',
      type: 'text',
      name: 'name',
      disabled: false,
      placeholder: account.Name,
    },
    {
      md: 6,
      label: 'Email',
      type: 'email',
      name: 'email',
      disabled: true,
      placeholder: account.Email,
      value: account.Email,
    },
    {
      md: 6,
      label: 'Số điện thoại',
      type: 'number',
      name: 'phone',
      disabled: false,
      placeholder: account.Phone,
    },
    {
      md: 6,
      label: 'Ngày sinh',
      type: 'date',
      name: 'birth',
      disabled: false,
      placeholder: account.Birth,
    },
    {
      md: 6,
      label: 'Giới tính',
      type: 'text',
      name: 'gender',
      disabled: false,
      placeholder: account.Gender,
    },
    {
      md: 6,
      label: 'Niên khóa',
      type: 'text',
      name: 'year',
      disabled: false,
      placeholder: account.Year,
    },
    {
      md: 12,
      label: 'Giới thiệu',
      type: 'textarea',
      name: 'introduce',
      disabled: false,
      placeholder: account.Introduce,
    },
  ];
  const listPass = [
    {
      md: 12,
      label: 'Mật khẩu cũ',
      type: 'password',
      name: 'pass-old',
      disabled: false,
      placeholder: '',
    },
    {
      md: 12,
      label: 'Mật khẩu mới',
      type: 'password',
      name: 'pass-new',
      disabled: false,
      placeholder: '',
    },
    {
      md: 12,
      label: 'Nhập lại mật khẩu',
      type: 'password',
      name: 're-pass',
      disabled: false,
      placeholder: '',
    },
  ];
  const listMSSV = [
    {
      md: 12,
      label: 'Mã số sinh viên',
      type: 'number',
      name: 'mssv',
      disabled: account.MSSV ? true : false,
      placeholder: account.MSSV,
    },
  ];
  const dispatch = useAppDispatch();
  const handleInfo = async (e: any) => {
    e.preventDefault();
    const accountNew = {
      Name: e.target[0].value || account.Name,
      Email: e.target[1].value || account.Email,
      Phone: e.target[2].value || account.Phone,
      Birth: e.target[3].value || account.Birth,
      Gender: e.target[4].value || account.Gender,
      Year: e.target[5].value || account.Year,
      Introduce: e.target[6].value || account.Introduce,
    };
    const key = {
      Email: e.target[1].value,
    };

    const update = (
      await dispatch(
        updateAccount({ jwt: localStorage.getItem('jwt'), key: key, account: accountNew }),
      )
    ).payload;

    if (update) {
      Swal.fire({
        icon: 'success',
        title: 'CẬP NHẬT THÔNG TIN THÀNH CÔNG',
      });

      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'CẬP NHẬT KHÔNG THÀNH CÔNG',
    });
  };

  const handlePass = async (e: any) => {
    e.preventDefault();

    if (e.target[1].value != e.target[2].value) {
      Swal.fire({
        icon: 'error',
        title: 'MẬT KHẨU KHÔNG TRÙNG KHỚP',
      });

      return;
    }

    const Email = account.Email;
    const Password = e.target[0].value;
    const PasswordNew = e.target[1].value;

    const update = (
      await dispatch(updatePass({ jwt: localStorage.getItem('jwt'), Email, Password, PasswordNew }))
    ).payload;

    if (update) {
      Swal.fire({
        icon: 'success',
        title: 'CẬP NHẬT MẬT KHẨU THÀNH CÔNG',
      });

      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'MẬT KHẨU CŨ KHÔNG CHÍNH XÁC',
    });
  };

  const handleMSSV = async (e: any) => {
    e.preventDefault();
    
    const update = (
      await dispatch(
        updateMSSV({ jwt: localStorage.getItem('jwt'), Email: account.Email, MSSV: e.target[0].value}),
      )
    ).payload;

    if (update) {
      Swal.fire({
        icon: 'success',
        title: 'CẬP NHẬT MSSV THÀNH CÔNG',
      });

      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'MSSV ĐÃ TỒN TẠI',
    });
  };

  switch (location) {
    case '/user/info':
      return (
        <div className="user">
          <div className="bg-white shadow rounded-lg d-block d-sm-flex">
            <UserNav name={account.Name} image={account.Image} focus={0}></UserNav>
            <UserBody
              title="Thông tin cá nhân"
              content={listInfo}
              handleBtn={handleInfo}
            ></UserBody>
          </div>
        </div>
      );
      break;
    case '/user/password':
      return (
        <div className="user">
          <div className="bg-white shadow rounded-lg d-block d-sm-flex">
            <UserNav name={account.Name} image={account.Image} focus={1}></UserNav>
            <UserBody
              title="Thông tin cá nhân"
              content={listPass}
              handleBtn={handlePass}
            ></UserBody>
          </div>
        </div>
      );
      break;
    case '/user/mssv':
      return (
        <div className="user">
          <div className="bg-white shadow rounded-lg d-block d-sm-flex">
            <UserNav name={account.Name} image={account.Image} focus={2}></UserNav>
            <UserBody
              title="Thông tin cá nhân"
              content={listMSSV}
              handleBtn={handleMSSV}
            ></UserBody>
          </div>
        </div>
      );
      break;
    default:
      return <div></div>;
  }
};
