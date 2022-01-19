import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CardClass } from '../CardClass/CardClass';
import './ListClass.scss';

export const ListClass: React.FC<IListClass> = ({ listclass }) => {
  const className = 'list-card';
  const history = useHistory();
  const handleClickDetailClass = (item: any) => {
    console.log(item)
    if (item.Status === false) {
      Swal.fire({
        icon: 'error',
        title: 'LỚP HỌC ĐÃ BỊ KHÓA DO VI PHẠM TIÊU CHUẨN CỘNG ĐỒNG',
      });
    } else {
      history.push({
        pathname: `/myclassroom/${item.CodeClass}/1/antbntig`,
      });
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <div className={`${className}__line`}></div>
          <h2 className={`${className}__title`}>Danh Sách Lớp Học</h2>
          <div className={`${className}`}>
            <div className={`${className}__col`}>
              {listclass &&
                listclass.map((item, index) => {
                  return (
                    <div className={`${className}__col-1-3`} key={index}>
                      <div className={`${className}__item`}>
                        <div className={`${className}__img`}>
                          <img
                            src={item.Image}
                            alt={item.Title}
                            onClick={() => handleClickDetailClass(item)}
                          />
                        </div>
                        <div className={`${className}__info`}>
                          <h6
                            className={`${className}__item-title`}
                            onClick={() => handleClickDetailClass(item)}
                          >
                            {item.Title}
                          </h6>
                          <div className={`${className}__name`}>
                            {item.Theme ? `Chủ đề: ${item.Theme}` : ' '}
                          </div>
                          <div className={`${className}__name`}>
                            {item.Part ? `Phần: ${item.Part}` : ' '}
                          </div>
                          <div className={`${className}__name`}>
                            {item.Room ? `Phòng: ${item.Room}` : ' '}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
