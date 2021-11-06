import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { CardClass } from '../CardClass/CardClass';
import './ListClass.scss';
export const ListClass: React.FC<IListClass> = ({ listclass }) => {
  return (
    <div className="list-card">
      <Row xs={1} md={4} className="g-4">
      {listclass && listclass.map((item,i)=>{
              return <CardClass key={i} image={item.Image} title={item.Title}/>
           })}
      </Row>
    </div>
  );
};
