import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './CreatePost.scss';

export const CreatePost = () => {
  const [isWrite, setIsWrite] = useState(false);
  const [content, setContent] = useState('');
  return (
    <div className="create-post">
      {isWrite ? (
        <div className="create-post__container">
          <div className="create-post__container__post">
            <Form.Floating>
              <Form.Control
                id="floatingInputCustom"
                type="text"
                onChange={(e) => setContent(e.target.value)}
              />
              <label htmlFor="floatingInputCustom">Thông báo nội dung cho lớp học của bạn</label>
            </Form.Floating>
          </div>
          <div className="create-post__container__group-btn">
            <button
              className="create-post__container__group-btn--mr-9 create-post__container__group-btn__cancel"
              onClick={() => {
                setIsWrite(!isWrite);
                setContent('');
              }}
            >
              Hủy
            </button>
            <button
              className={`create-post__container__group-btn--mr-9 ${
                content
                  ? 'create-post__container__group-btn--post'
                  : 'create-post__container__group-btn--disable'
              }`}
            >
              Đăng
            </button>
          </div>
        </div>
      ) : (
        <div className="create-post__container" onClick={() => setIsWrite(!isWrite)}>
          <div className="create-post__container__img">
            <img src="https://lh3.googleusercontent.com/a/default-user=s40-c" alt="huhu" />
          </div>
          <div className="create-post__container__notify">
            Thông báo nội dung cho lớp học của bạn
          </div>
        </div>
      )}
    </div>
  );
};
