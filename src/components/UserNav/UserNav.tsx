import React, { useState } from 'react';
import './UserNav.scss';

import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface UserNav {
  name: string;
  image: string;
  focus: number;
}

export const UserNav = ({ name, image, focus }: UserNav) => {
  const listAction = [
    {
      title: 'Thông tin cá nhân',
      url: '/user/info'
    },
    {
      title: 'Đổi mật khẩu',
      url: '/user/password'
    },
    {
      title: 'Đổi mã số sinh viên',
      url: '/user/mssv'
    },
  ];

  return (
    <div className="nav">
      <div className="nav__content">
        <div className="nav__logo">
          <div className="nav__logo--img">
            <Image src={image} roundedCircle />
          </div>
          <h4 className="nav__logo--title">{name}</h4>
        </div>
        <div className="nav__list-item ">
          {listAction.map((item, move) => {
            return (
              <div className={`nav__item ${focus == move ? 'nav__item--focus' : ''} `} key={move}>
                <Link to={item.url} title={item.title}>
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
