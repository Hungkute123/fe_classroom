import React, { useState } from 'react';
import {
  Button,
  ButtonGroup, Dropdown,
  DropdownButton, Image, Offcanvas
} from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CreateClassModal } from '../../CreateClassModal/CreateClassModal';
import './Header.scss';


export const Header = () => {
  const [menu, setMenu] = useState(false);

  const handleShow = () => setMenu(true);
  const handleClose = () => setMenu(false);

  return (
    <div className="header">
      <div className="header__logo">
        <div className="header__logo--btn">
          <Button variant="outline-dark" onClick={handleShow}>
            <AiOutlineMenu />
          </Button>

          <Offcanvas show={menu} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Classroom</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>Hahaha</Offcanvas.Body>
          </Offcanvas>
        </div>
        <Link to="/">
          <img src="/assets/profile.jpg" alt="" />
        </Link>
        <h4>Class Room v1.0</h4>
      </div>
      <div className="header__body">
        <div className="header__body--item">
          <Button variant="outline-warning">Warning</Button>
        </div>
        <div className="header__body--item">
          <Button variant="outline-warning">Warning</Button>
        </div>
        <div className="header__body--item">
          <Button variant="outline-warning">Warning</Button>
        </div>
      </div>
      <div className="header__action">
        <div className="header__item">
          <DropdownButton
            as={ButtonGroup}
            title={<BsPlusLg size={25} />}
            id="bg-nested-dropdown"
            variant=""
          >
            <Dropdown.Item eventKey="1">Tham gia lớp học</Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <CreateClassModal />
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="header__item">
          <Link to="/">
            <Image src="/assets/profile.jpg" roundedCircle />
          </Link>
        </div>
      </div>
    </div>
  );
};
