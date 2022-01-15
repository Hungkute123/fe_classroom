import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  Offcanvas,
} from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
import { CreateClassModal } from '../../CreateClassModal/CreateClassModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import './Header.scss';
import { JoinClasByCodeModal } from '../../JoinClassByCodeModal/JoinClassByCodeModal';

export const Header = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenJoinClass, setIsOpenJoinClass] = useState(false)
  const [menu, setMenu] = useState(false);
  const account: any = useSelector((state: RootState) => state.account.account);
  const handleShow = () => setMenu(true);
  const handleClose = () => setMenu(false);
  const handleLogout = () => {
    window.localStorage.clear();
    history.push({
      pathname: `/account/login`,
    });
  };
  return (
    <div className="header">
      <CreateClassModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <JoinClasByCodeModal isOpen={isOpenJoinClass} setIsOpen={setIsOpenJoinClass}/>
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
          <img src="/logo.jpg" alt="" />
        </Link>
      </div>
      <div className="header__action">
        <div className="header__item">
          {/* <button className="header__item__btn" onClick={() => setIsOpen(true)}>
            <BsPlusLg size={25} />
          </button> */}
          <DropdownButton
            as={ButtonGroup}
            title={<BsPlusLg size={25} />}
            id="bg-nested-dropdown"
            variant=""
            key={'action'}
          >
            <Dropdown.Item eventKey="1" onClick={() => setIsOpenJoinClass(true)}>
              Tham gia lớp học
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setIsOpen(true)}>
              Tạo lớp học
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="header__item">
          <DropdownButton
            as={ButtonGroup}
            title={<Image src={account.Image} roundedCircle />}
            id="bg-nested-dropdown"
            variant=""
            key={'user'}
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
            <Dropdown.Item eventKey="4" onClick={handleLogout}>
              Đăng xuất
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
};
