import React from 'react';
import './User.scss';

import { UserNav, UserBody } from '../../components';
import { Container } from 'react-bootstrap';

export const User = () => {
  const listInfo = [
    {
      md: 6,
      label: 'Họ',
      type: 'text',
      name: 'first-name',
    },
    {
      md: 6,
      label: 'Tên',
      type: 'text',
      name: 'last-name',
    },
    {
      md: 6,
      label: 'Email',
      type: 'email',
      name: 'email',
    },
    {
      md: 6,
      label: 'Số điện thoại',
      type: 'number',
      name: 'phone',
    },
    {
      md: 6,
      label: 'Mã số sinh viên',
      type: 'number',
      name: 'mssv',
    },
    {
      md: 6,
      label: 'Niên khóa',
      type: 'text',
      name: 'year',
    },
    {
      md: 12,
      label: 'Giới thiệu',
      type: 'textarea',
      name: 'introduce',
    },
  ];

  const handleBtn = () => {};
  return (
    <div className="user">
      <div className="bg-white shadow rounded-lg d-block d-sm-flex">
        <UserNav></UserNav>
        <UserBody title="Thông tin cá nhân" content={listInfo} handleBtn={handleBtn}></UserBody>
      </div>
    </div>
  );
};
