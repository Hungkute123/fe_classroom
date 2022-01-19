import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CardClass } from '../CardClass/CardClass';
import './ListClass.scss';

export const ListClass: React.FC<IListClass> = ({ listclass }) => {
  const className = 'list-card';

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
                          <img src={item.Image} alt={item.Title} />
                        </div>
                        <div className={`${className}__info`}>
                          <h6 className={`${className}__item-title`}>
                            <Link to={`/myclassroom/${item.CodeClass}/1/antbntig`}>
                              {item.Title}
                            </Link>
                          </h6>
                          <div className={`${className}__name`}>Chủ đề: {item.Theme}</div>
                          <div className={`${className}__name`}>Phần: {item.Part}</div>
                          <div className={`${className}__name`}>Phòng: {item.Room}</div>
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
