import React, { useState } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Image, Offcanvas } from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CreateClassModal } from '../../CreateClassModal/CreateClassModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import './Header.scss';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState(false);
<<<<<<< HEAD
  const account: any = useSelector((state: RootState) => state.account.account);

=======
>>>>>>> bff13f8e5dd1b0536c7e76ea3d0b2bb600da811c
  const handleShow = () => setMenu(true);
  const handleClose = () => setMenu(false);
  return (
    <div className="header">
      <CreateClassModal isOpen={isOpen} setIsOpen={setIsOpen}/>
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
          <img src="/assets/logo.jpg" alt="" />
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
            key={"action"}
          >
            <Dropdown.Item eventKey="1">Tham gia lớp học</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setIsOpen(true)}>Tạo lớp học
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="header__item">
          <DropdownButton
            as={ButtonGroup}
            title={<Image src={account.Image} roundedCircle />}
            id="bg-nested-dropdown"
            variant=""
            key={"user"}
          >
            <Dropdown.Item eventKey="1">
              <Link to="/user/info">Trang cá nhân</Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <Link to="/user/password">Đổi mật khẩu</Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              <Link to="/user/mssv">Đổi mã số sinh viên</Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="4">
              <Link to="/account/log-out">Đăng xuất</Link>
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
};
