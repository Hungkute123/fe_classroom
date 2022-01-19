import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { inviteClassroom } from '../../redux/slice/appSlice/classroomSlice';
import { useAppDispatch } from '../../redux/store';
import './AddTeacherModal.scss';

export const AddTeacherModal: React.FC<IModal> = ({ isOpen, setIsOpen }) => {
  const [validated, setValidated] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const [emailTeacher, setEmailTeacher] = useState('');
  const dispatch = useAppDispatch();
  const { codeclass }: { codeclass: string } = useParams();
  let path =
    (process.env.URL_MY_HOST || 'https://heheclassroom.netlify.app/') + `invite?codeclass=${codeclass}`;
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSpinner(true);
    const invite = {
      email: event.target[0].value,
      path: `${path}&permission=Teacher`,
      jwt: localStorage.getItem('jwt'),
    };
    const check = (await dispatch(inviteClassroom(invite))).payload;
    setIsOpen(false);
    setEmailTeacher('');
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
    setEmailTeacher('')
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
            <FloatingLabel controlId="formCreateClass" label="Email" className="mb-3">
              <Form.Control
                type="emailTeacher"
                placeholder="Nhập email người bạn muốn mời"
                value={emailTeacher}
                  onChange={(e) => setEmailTeacher(e.target.value)}
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
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                Loading...
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
