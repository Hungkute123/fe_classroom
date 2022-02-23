import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navs.scss';
interface INavs {
  title?: string;
  list?: any;
}
export const Navs: React.FC<INavs> = ({ title, list }) => {
  return (
    <div className="navs">
      <div className="navs__title">{title}</div>
      {list.map((item: any, index: number) => {
        return (
          <>
            <Link to={`/myclassroom/${item.CodeClass}/1/antbntig`}>
              <div className={`navs__body__container`} key={index}>
                <div className="navs__body__container__image">
                  <img src={item.Image}></img>
                  <div className="navs__body__container__content">
                    <div className="navs__body__container__content__header">
                      <div className="navs__body__container__content__title">{item.Title}</div>
                    </div>
                    <div className="navs__body__container__content__body">
                      <div className="navs__body__container__content__body__title">
                        <span>{item.Theme}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </>
        );
      })}

      {/* <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">Active</Nav.Link>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav> */}
    </div>
  );
};
