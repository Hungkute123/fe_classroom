import moment from 'moment';
import React from 'react';
import { BsPeople, BsPlay } from 'react-icons/bs';
import './Post.scss';

export const Post = () => {
  return (
    <div className="post">
      <div className={`post__container post--pt-2 post--pr-2 post--pb-2 post--pl-2 `}>
        <div className="post__container__image">
          <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
          <div className="post__container__content">
            <div className="post__container__content__header">
              <div className="post__container__content__title">NguYỄN ĐÌNH HÙNG</div>
              <span className="post__container__content__time">
                {moment('22/10/2022').format('hh:mm:ss DD/MM/YYYY')}
              </span>
            </div>
            <div className="post__container__content__body">
              <div className="post__container__content__body__title">
                <span>HEHE </span>
                https://lh3.googleusercontent.com/a/default-user=s40-c
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="post__line"></div>
      <div className="post__total-comment">
        <span className="post__icon">
          <BsPeople size="22px" />
        </span>
        3 nhận xét về lớp học
      </div>
      <div className={`post__container post--pt-1 post--pr-2 post--pb-1 post--pl-2`}>
        <div className="post__container__image">
          <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
          <div className="post__container__content">
            <div className="post__container__content__header">
              <div className="post__container__content__title">NguYỄN ĐÌNH HÙNG</div>
              <span className="post__container__content__time">
                {moment('22/10/2022').format('hh:mm:ss DD/MM/YYYY')}
              </span>
            </div>
            <div className="post__container__content__body">
              <div className="post__container__content__body__title">
                <span>HEHE </span>
                https://lh3.googleusercontent.com/a/default-user=s40-c
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`post__container post--pt-1 post--pr-2 post--pb-1 post--pl-2`}>
        <div className="post__container__image">
          <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
          <div className="post__container__content">
            <div className="post__container__content__header">
              <div className="post__container__content__title">NguYỄN ĐÌNH HÙNG</div>
              <span className="post__container__content__time">
                {moment('22/10/2022').format('hh:mm:ss DD/MM/YYYY')}
              </span>
            </div>
            <div className="post__container__content__body">
              <div className="post__container__content__body__title">
                <span>HEHE </span>
                https://lh3.googleusercontent.com/a/default-user=s40-c
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="post__line"></div>
      <div className={`post__container post--pt-1 post--pr-2 post--pl-2`}>
        <div className="post__container__image">
          <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
          <div className="post__container__content">
            <input type="text" className="post__container__content__input" placeholder="Nhập nội dung nhận xét của bạn"/>
            <button className="post__container__content__btn">
              <BsPlay size="22px" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
