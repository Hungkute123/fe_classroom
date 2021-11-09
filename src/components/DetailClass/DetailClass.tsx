import React, { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './DetailClass.scss';
import { BsExclamationCircle, BsFiles } from 'react-icons/bs';
interface IDetailClass {
  img?: string;
}
export const DetailClass: React.FC<IDetailClass> = ({ img }) => {
  const [isShow, setShow] = useState('');
  const handleClick = () => {
    if (isShow === '') {
      setShow('show');
    } else {
      setShow('');
    }
  };
  return (
    <div className={`detail-class detail-class__${isShow}`}>
      <div className={`detail-class__container detail-class__container__${isShow}`}>
        <img src="https://gstatic.com/classroom/themes/img_backtoschool.jpg" alt="Background" />
        <div className="detail-class__container__bottom-left">
          <div className="detail-class__container__bottom-left__name">Nguyễn Đình Hùng</div>
          <div className="detail-class__container__bottom-left__part">Phần</div>
        </div>
        <div className="detail-class__container__top-right">
          <button className="detail-class__container__top-right__btn">Tải ảnh lên</button>
        </div>
        <div className="detail-class__container__bottom-right">
          <button className="detail-class__container__bottom-right__btn" onClick={handleClick}>
            <BsExclamationCircle />
          </button>
        </div>
      </div>
      <div className={`detail-class__panel detail-class__panel__${isShow}`}>
        <div className="detail-class__panel__padding">
          <div className="detail-class__panel__detail">
            <em>Mã lớp: </em>abc <button><BsFiles/></button>
          </div>
          <div className="detail-class__panel__detail">
            <em>Chủ đề: </em>haha
          </div>
          <div className="detail-class__panel__detail">
            <em>Phòng: </em>haiz
          </div>
        </div>
      </div>
    </div>
  );
};
