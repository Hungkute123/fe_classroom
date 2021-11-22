import React, { useRef, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { BsFiles } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import './AddStudentModal.scss';

export const AddStudentModal: React.FC<IModal> = ({ isOpen, setIsOpen }) => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('Nhấn để copy mã');
  const target = useRef(null);
  const dispatch = useDispatch();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // setIsOpen(false);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleClickCopy = () => {
    setTitle('Đã copy mã');
    navigator.clipboard.writeText('hahahahaha');
    setIsOpen(true);
  };
  return (
    <>
      <div className="add-student-modal">
        <Modal
          show={isOpen}
          onHide={setIsOpen}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Mời học viên</Modal.Title>
          </Modal.Header>
          <Form validated={validated} onSubmit={handleSubmit}>
            <Modal.Body>
            <h4 className="add-student-modal__title-link">Đường liên kết mời</h4>
            <Container>
          <Row>
            <Col md={11}>
            <p className="add-student-modal__link">
                http://localhost:5000/myclassroom/0a93718
              </p>
            </Col>
            <Col md={1}>
            <button
                  className="add-student-modal__copy"
                  ref={target}
                  onClick={handleClickCopy}
                  title={title}
                >
                  <BsFiles />
                </button>
            </Col>
          </Row>

        </Container>
              
              
              
              
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
      </div>
    </>
  );
};
