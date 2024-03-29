import React, { useRef, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { BsFiles } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { inviteClassroom } from '../../redux/slice/appSlice/classroomSlice';
import { useAppDispatch } from '../../redux/store';
import './AddStudentModal.scss';

export const AddStudentModal: React.FC<IModal> = ({ isOpen, setIsOpen }) => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('Nhấn để copy mã');
  const [isSpinner, setIsSpinner] = useState(false);
  const target = useRef(null);
  const dispatch = useAppDispatch();
  const { codeclass }: { codeclass: string } = useParams();
  let path = (process.env.URL_MY_HOST || 'https://classroom-2022.netlify.app/') + `invite?codeclass=${codeclass}`;
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSpinner(true);
    const invite = {
      email: email,
      path: `${path}&permission=Student`,
      jwt: localStorage.getItem('jwt'),
    };
    const check = (await dispatch(inviteClassroom(invite))).payload;
    setIsOpen(false);
    setEmail('');
    setIsSpinner(false);
    if (check === 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Đã gửi mail',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gửi mail không thành công',
      });
    }
  };
  const handleClose = () => {
    setEmail('');
    setIsOpen(false);
  };
  const handleClickCopy = () => {
    setTitle('Đã copy mã');
    navigator.clipboard.writeText(path);
    toast.success(`Copy đường liên kết thành công`, {
      position: 'bottom-left',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
          <div className="add-student-modal__body-link">
          <h4 className="add-student-modal__title-link">Đường liên kết mời</h4>
              <Container>
                <Row>
                  <Col md={11}>
                    <p className="add-student-modal__link">{path}</p>
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
          </div>
          <Form validated={validated} onSubmit={handleSubmit}>
            <Modal.Body>
              <FloatingLabel controlId="formCreateClass" label="Email" className="mb-3">
                <Form.Control
                  type="emailStudent"
                  placeholder="Nhập email người bạn muốn mời"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Hủy
              </Button>
              {isSpinner == false ? (
                <Button variant="primary" type="submit">
                  Mời
                </Button>
              ) : (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              )}
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};
