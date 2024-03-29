import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addClassroom, createClassroom } from '../../redux/slice/appSlice/classroomSlice';
import './CreateClassModal.scss';

export const CreateClassModal: React.FC<IModal> = ({ isOpen, setIsOpen }) => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [part, setPart] = useState('');
  const [theme, setTheme] = useState('');
  const [room, setRoom] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const classroom = {
      Title: title,
      Part: part,
      Theme: theme,
      Image: 'https://www.gstatic.com/classroom/themes/img_backtoschool.jpg',
      Room: room,
      jwt: localStorage.getItem('jwt'),
    };
    dispatch(createClassroom(classroom));
    
    setIsOpen(false);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        show={isOpen}
        onHide={setIsOpen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo lớp học</Modal.Title>
        </Modal.Header>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <FloatingLabel controlId="formCreateClass" label="Tên lớp học" className="mb-3">
              <Form.Control type="nameClass" placeholder="Nhập tên lớp học" required value={title} onChange={(e)=>setTitle(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="formPartClass" label="Phần" className="mb-3">
              <Form.Control type="partClass" placeholder="Nhập phần của lớp học" value={part} onChange={(e)=>setPart(e.target.value)}/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="formThemeClass" label="Chủ đề" className="mb-3">
              <Form.Control type="themeClass" placeholder="Nhập chủ đề lớp học" value={theme} onChange={(e)=>setTheme(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="formRoomClass" label="Phòng" className="mb-3">
              <Form.Control type="roomClass" placeholder="Nhập số phòng" value={room} onChange={(e)=>setRoom(e.target.value)}/>
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
