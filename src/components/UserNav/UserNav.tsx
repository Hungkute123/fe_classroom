import React, { useState } from 'react';
import './UserNav.scss';

import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const UserNav = () => {
  const [focus, setFocus] = useState(0);
  const listAction = [
    {
      title: 'Thông tin cá nhân',
    },
    {
      title: 'Đổi mật khẩu',
    },
    {
      title: 'Thông báo',
    },
  ];

  return (
    <div className="nav">
      <div className="nav__content">
        <div className="nav__logo">
          <div className="nav__logo--img">
            <Image src="/assets/profile.jpg" roundedCircle />
          </div>
          <h4 className="nav__logo--title">Nguyễn Hà Anh Kiểm</h4>
        </div>
        <div className="nav__list-item ">
          {listAction.map((item, move) => {
            return (
              <div className={`nav__item ${focus == move ? 'nav__item--focus' : ''} `}>
                <Link to="/" title={item.title}>
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
