import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CardClass.scss';
export const CardClass:React.FC<ICardClass> = ({id, codeclass, image, title, theme, part}) => {
  return (
    <div className="card-class">
      <Card style={{ width: '18rem', height: '18.75rem' }}>
      <Card.Img variant="top" src={`${image}`} style={{ height: '6rem' }}/>
        <Card.Body>
          <Card.Title className="card-class__title">{title}</Card.Title>
          {/* <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </Card.Text> */}
          <Link to={`/myclassroom/${codeclass}/1/antbntig`}>
          <Card className="text-center mt-2 mb-2 position-absolute bottom-0 start-50 translate-middle-x" style={{ width: '10rem'}}>
          <Button variant="primary" >Truy cập</Button>
          </Card>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};
