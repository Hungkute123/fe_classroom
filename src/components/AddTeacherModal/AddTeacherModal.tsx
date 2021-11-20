import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './AddTeacherModal.scss';

export const AddTeacherModal: React.FC<IModal> = ({ isOpen, setIsOpen }) => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (event: any) => {
    event.preventDefault();
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
          <Modal.Title>Mời giáo viên</Modal.Title>
        </Modal.Header>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Mời
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
