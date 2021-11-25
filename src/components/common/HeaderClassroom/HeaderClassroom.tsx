import React, { useState } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Image, Offcanvas } from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { Link, useHistory, useParams } from 'react-router-dom';
import { CreateClassModal } from '../../CreateClassModal/CreateClassModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import './HeaderClassroom.scss';

export const HeaderClassroom = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const handleShow = () => setMenu(true);
  const handleClose = () => setMenu(false);
  const { codeclass }: { codeclass: string } = useParams();
  const { number }: { number: string } = useParams();
  const account: any = useSelector((state: RootState) => state.account.account);
  const handleLogout = () => {
    window.localStorage.clear();
    history.push({
      pathname: `/account/login`,
    });
  };
  return (
    <div className="header-classroom">
      <CreateClassModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="header-classroom__logo">
        <div className="header-classroom__logo--btn">
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
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFDa5Tu6odQxY7NItBaXbVdJDW9qcLx8sJ3bKHtSvdKkcpqcrJEZQq7fatBoBkL4BTR0&usqp=CAU" alt="" />
        </Link>
      </div>
      <div className="header-classroom__body">
        <Link to={`/myclassroom/${codeclass}/1/antbntig`}>
          <div
            className={`header-classroom__title ${
              number == '1' ? 'header-classroom__title--select' : ''
            }`}
          >
            Bảng tin
          </div>
        </Link>
        <Link to={`/myclassroom/${codeclass}/2/omiuniguo`}>
          <div
            className={`header-classroom__title ${
              number == '2' ? 'header-classroom__title--select' : ''
            }`}
          >
            Mọi người
          </div>
        </Link>
      </div>
      <div className="header-classroom__action">
        <div className="header-classroom__item">
          <button className="header__item__btn" onClick={() => setIsOpen(true)}>
            <BsPlusLg size={25} />
          </button>
          {/* <DropdownButton
            as={ButtonGroup}
            title={<BsPlusLg size={25} />}
            id="bg-nested-dropdown"
            variant=""
          >
            <Dropdown.Item eventKey="1">Tham gia lớp học</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setIsOpen(true)}>
              Tạo lớp học
            </Dropdown.Item>
          </DropdownButton> */}
        </div>
        <div className="header-classroom__item">
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
