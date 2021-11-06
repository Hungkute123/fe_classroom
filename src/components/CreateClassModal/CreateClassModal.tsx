import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addClassroom, createClassroom } from '../../redux/slice/appSlice/classroomSlice';

import './CreateClassModal.scss';
export const CreateClassModal = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const classroom = {
      Title: event.target[0].value,
      Part: event.target[1].value,
      Theme: event.target[2].value,
      Image: 'https://www.gstatic.com/classroom/themes/img_backtoschool.jpg',
      Room: Number(event.target[3].value),
    };
    dispatch(createClassroom(classroom));
    const action = addClassroom(classroom);
    dispatch(action);
    setShow(false);
  };
  return (
    <>
      <div onClick={handleShow}>Tạo lớp học</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo lớp học</Modal.Title>
        </Modal.Header>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <FloatingLabel controlId="formCreateClass" label="Tên lớp học" className="mb-3">
              <Form.Control type="nameClass" placeholder="Nhập tên lớp học" required />
            </FloatingLabel>
            <FloatingLabel controlId="formPartClass" label="Phần" className="mb-3">
              <Form.Control type="partClass" placeholder="Nhập phần của lớp học" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="formThemeClass" label="Chủ đề" className="mb-3">
              <Form.Control type="themeClass" placeholder="Nhập chủ đề lớp học" />
            </FloatingLabel>
            <FloatingLabel controlId="formRoomClass" label="Phòng" className="mb-3">
              <Form.Control type="roomClass" placeholder="Nhập số phòng" />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Tạo
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
