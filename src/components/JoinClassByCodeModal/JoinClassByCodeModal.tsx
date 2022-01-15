import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { joinClassroom } from '../../redux/slice/appSlice/memberClassroomSlice';
import { useAppDispatch } from '../../redux/store';
import { toast, ToastContainer } from 'react-toastify';

export const JoinClasByCodeModal: React.FC<IModal> = ({ isOpen, setIsOpen }) => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const dispatch = useAppDispatch();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const classroom = {
      codeclass: event.target[0].value,
      permission: 'Student',
      jwt: localStorage.getItem('jwt'),
    };

    const check = (await dispatch(joinClassroom(classroom))).payload;
    console.log(typeof check);
    if (typeof check === 'undefined') {
      toast.warning(`Mã lớp học không hợp lệ`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else{
        if (check !== null && check) {
            history.push({
              pathname: `/myclassroom/${classroom.codeclass}/1/antbntig`,
            });
            toast.success(`Tham gia lớp học thành công`, {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setIsOpen(false);
          } else {
            toast.warning(`Đã tham gia lớp học`, {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
    }
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
          <Modal.Title>Tham gia lớp học</Modal.Title>
        </Modal.Header>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <FloatingLabel controlId="formCreateClass" label="Mã lớp" className="mb-3">
              <Form.Control type="nameClass" placeholder="Nhập mã lớp bạn muốn tham gia" required />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Tham gia
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
