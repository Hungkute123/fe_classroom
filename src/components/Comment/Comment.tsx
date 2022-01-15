import React from 'react';
import { BsPerson } from 'react-icons/bs';
import './Comment.scss';

export const Comment = () => {
  return (
    <div className="comment">
      <div className="comment__header">
        <span className="comment__header__icon">
          <BsPerson />
        </span>
        <span className="comment__header__title">2 nhận xét riêng tư</span>
      </div>
      <div className="comment__body">
        <div className="comment__body__container">
          <div className="comment__body__container__image">
            <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
            <div className="comment__body__container__content">
              <div className="comment__body__container__content__header">
                <div className="comment__body__container__content__title">Nguyễn Hà Anh Kiểm</div>
                <span className="comment__body__container__content__time">9:12 17/01/2022</span>
              </div>
              <div className="comment__body__container__content__body">
                <div className="comment__body__container__content__body__title">
                  Điểm mong muốn:
                  <span> 10</span>
                </div>
                <div className="comment__body__container__content__body__title">
                  Giải thích: <span>Cho điểm gì kỳ vậy, làm như vậy mà cho có 9,5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="comment__body__container">
          <div className="comment__body__container__image">
            <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
            <div className="comment__body__container__content">
              <div className="comment__body__container__content__header">
                <div className="comment__body__container__content__title">Nguyễn Đình Hùng</div>
                <span className="comment__body__container__content__time">9:12 17/01/2022</span>
              </div>
              <div className="comment__body__container__content__body">
                <div className="comment__body__container__content__body__title">
                  Điểm sau phúc khảo:
                  <span> 10</span>
                </div>
                <div className="comment__body__container__content__body__title">
                  Nhận xét: <span>Chấm lộn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
