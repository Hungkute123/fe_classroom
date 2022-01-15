import React from 'react';
import './StudentMark.scss';

export const StudentMark = () => {
  const className = 'student-mark';

  return (
    <div className={`${className}__plex`}>
      <div className="col-xl-5 col-lg-5 col-sm-5">
        <div className={`${className}`}>
          <div className={`${className}__header`}>
            <h3 className={`${className}__title`}>Bảng Điểm</h3>
            <p className={`${className}__mark`}>Điểm trung bình: 10 điểm</p>
          </div>
          <ul className={`${className}__list`}>
            <li className={`${className}__item`}>
              <span>Bài Tập</span>
              <strong>0 điểm</strong>
            </li>
          </ul>
          <div className={`${className}__footer`}>
            <button className="btn btn-success">Thực Hiện Phúc Khảo</button>
          </div>
        </div>
      </div>
    </div>
  );
};
