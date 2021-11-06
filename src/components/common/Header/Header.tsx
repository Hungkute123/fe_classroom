import React from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import { CreateClassModal } from '../../CreateClassModal/CreateClassModal';
import './Header.scss';

export const Header = () => {
  return (
    <div className="header">
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Comming soon</Offcanvas.Title>
            </Offcanvas.Header>
          </Navbar.Offcanvas>
          <DropdownButton
            as={ButtonGroup}
            id={`dropdown-button-drop-start`}
            drop="start"
            variant=""
            title={<BsPlusLg />}
          >
            <Dropdown.Item href="#/action-1">Tham gia lớp học</Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <CreateClassModal />
            </Dropdown.Item>
          </DropdownButton>
        </Container>
      </Navbar>
    </div>
  );
};
