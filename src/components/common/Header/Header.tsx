import React, { useState } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Image, Offcanvas } from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
import { CreateClassModal } from '../../CreateClassModal/CreateClassModal';
import './Header.scss';

export const Header = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const handleShow = () => setMenu(true);
  const handleClose = () => setMenu(false);
  const handleLogout = () =>{
    window.localStorage.clear();
    history.push({
      pathname: `/account/login`,
    });
  }
  return (
    <div className="header">
      <CreateClassModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="header__logo">
        <div className="header__logo--btn">
          <Button variant="outline-dark" onClick={handleShow}>
            <AiOutlineMenu />
          </Button>
          <Offcanvas show={menu} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Classroom</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>Comming soon...</Offcanvas.Body>
          </Offcanvas>
        </div>
        <Link to="/">
          {/* <img src="/assets/profile.jpg" alt="" /> */}
          <h4>Classroom</h4>
        </Link>
      </div>
      <div className="header__action">
        <div className="header__item">
          <button className="header__item__btn" onClick={() => setIsOpen(true)}>
            <BsPlusLg size={25} />
          </button>
          {/* <DropdownButton
            as={ButtonGroup}
            title={<BsPlusLg size={25} />}
            id="bg-nested-dropdown"
            variant=""
            onClick={() => setIsOpen(true)}
          >
            <Dropdown.Item eventKey="1">Tham gia lớp học</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setIsOpen(true)}>Tạo lớp học
            </Dropdown.Item>
          </DropdownButton> */}
        </div>
        <div className="header__item">
          <DropdownButton
            as={ButtonGroup}
            title={<Image src="/assets/profile.jpg" roundedCircle />}
            id="bg-nested-dropdown"
            variant=""
          >
            <Dropdown.Item eventKey="1"><Link to="/user">Trang cá nhân</Link></Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={handleLogout}>Đăng xuất</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
};
