import React, { FC, useRef, useState } from 'react';
import { Col, Container, Dropdown, Overlay, Row, Tooltip } from 'react-bootstrap';
import './DetailClass.scss';
import { BsExclamationCircle, BsFiles } from 'react-icons/bs';
import { Grade } from './Grade/Grade';
import { Post } from './Post/Post';
import { toast } from 'react-toastify';
import { CreatePost } from './CreatePost/CreatePost';
interface IDetailClass {
  CodeClass: string;
  Title: string;
  Theme?: string;
  Part?: string;
  Image?: string;
  Room?: string;
  IsTeacher?: boolean;
}
export const DetailClass: React.FC<IDetailClass> = ({
  CodeClass,
  Title,
  Theme,
  Part,
  Image,
  Room,
  IsTeacher = false,
}) => {
  const [isShow, setShow] = useState('');
  const [title, setTitle] = useState('Nhấn để copy mã');
  const target = useRef(null);
  const handleClickMore = () => {
    if (isShow === '') {
      setShow('show');
    } else {
      setShow('');
    }
  };
  const handleClickCopy = () => {
    setTitle('Đã copy mã');
    navigator.clipboard.writeText(CodeClass);
    toast.success(`Copy mã lớp thành công`, {
      position: 'bottom-left',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className={`detail-class detail-class__${isShow}`}>
      <div className={`detail-class__container detail-class__container__${isShow}`}>
        <img src="/img_backtoschool.jpg" alt="Background" />
        <div className="detail-class__container__bottom-left">
          <div className="detail-class__container__bottom-left__name">{Title}</div>
          <div className="detail-class__container__bottom-left__part">{Part}</div>
        </div>
        {/* <div className="detail-class__container__top-right">
          <button className="detail-class__container__top-right__btn">Tải ảnh lên</button>
        </div> */}
        <div className="detail-class__container__bottom-right">
          <button
            className="detail-class__container__bottom-right__btn"
            onClick={handleClickMore}
            title="Xem thêm"
          >
            <BsExclamationCircle />
          </button>
        </div>
      </div>
      <div className={`detail-class__panel detail-class__panel__${isShow}`}>
        <div className="detail-class__panel__padding">
          <div className="detail-class__panel__detail">
            <em>Mã lớp: </em>
            {CodeClass}
            <button
              className="detail-class__panel__detail__button"
              ref={target}
              onClick={handleClickCopy}
              title={title}
            >
              <BsFiles />
            </button>
          </div>
          {Theme && (
            <div className="detail-class__panel__detail">
              <em>Chủ đề: </em>
              {Theme}
            </div>
          )}
          {Room && (
            <div className="detail-class__panel__detail">
              <em>Phòng: </em>
              {Room}
            </div>
          )}
        </div>
      </div>
      <div className="detail-class__content">
        <Container>
          <Row>
            <Col sm={2}>
              <Grade IsTeacher={IsTeacher} />
            </Col>
            <Col sm={10} className="detail-class__post">
              <CreatePost />
              <Post />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
