import React, { useState } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Image, Offcanvas } from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { CreateClassModal } from '../../CreateClassModal/CreateClassModal';
import './HeaderClassroom.scss';

export const HeaderClassroom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const handleShow = () => setMenu(true);
  const handleClose = () => setMenu(false);
  const { codeclass }: { codeclass: string } = useParams();
  const { number }: { number: string } = useParams();
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
            <Offcanvas.Body>Hahaha</Offcanvas.Body>
          </Offcanvas>
        </div>
        <Link to="/">
          <img src="/assets/profile.jpg" alt="" />
        </Link>
        <h4>Class Room v1.0</h4>
      </div>
      <div className="header-classroom__body">
        <Link to={`/myclassroom/${codeclass}/1/antbntig`}>
          <div className={`header-classroom__title ${number=="1" ? 'header-classroom__title--select' : ''}`}>Bảng tin</div>
        </Link>
        <Link to={`/myclassroom/${codeclass}/2/omiuniguo`}>
          <div className={`header-classroom__title ${number=="2" ? 'header-classroom__title--select' : ''}`}>Mọi người</div>
        </Link>
      </div>
      <div className="header-classroom__action">
        <div className="header-classroom__item">
          <DropdownButton
            as={ButtonGroup}
            title={<BsPlusLg size={25} />}
            id="bg-nested-dropdown"
            variant=""
          >
            <Dropdown.Item eventKey="1">Tham gia lớp học</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setIsOpen(true)}>
              Tạo lớp học
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="header-classroom__item">
          <Link to="/">
            <Image src="/assets/profile.jpg" roundedCircle />
          </Link>
        </div>
      </div>
    </div>
  );
};