import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { getClassroomByCodeClass } from '../../../redux/slice/appSlice/classroomSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store';
import reviewMarkApi from '../../../services/aixos/reviewMarkApi';
import './AnswerReview.scss';

interface IAnswerReview {
  isOpen: boolean;
  setIsOpen: any;
  codeClass: string;
  infoReviewMark: any;
}
let socket: any;
export const AnswerReview = ({ isOpen, setIsOpen, codeClass, infoReviewMark }: IAnswerReview) => {
  
  const dispatch = useAppDispatch();
  const { account } = useAppSelector((state: RootState) => state.account);
  const { infoMyClassroom } = useSelector((state: RootState) => state.classroom);
  const classroom = {
    codeclass: codeClass,
    jwt: localStorage.getItem('jwt'),
  };
  useEffect(() => {
    dispatch(getClassroomByCodeClass(classroom));
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };
  // Tạo kết nối socket
  useEffect(() => {
    const ENDPOINT = String(process.env.URL_MY_SOCKET);
    socket = io(ENDPOINT, { transports: ['websocket'] });
    socket.on('connect', () => {
      console.log(socket.id);
    });
    const id = `${account._id}reply`;
    socket.emit('getNotification', { _id: id });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const reviewMark = {
      FinalMark: e.target[2].value,
      Answer: e.target[3].value,
      Status: true,
    };

    const status = await reviewMarkApi.updateMark({
      jwt: localStorage.getItem('jwt'),
      CodeClass: codeClass,
      MSSV: infoReviewMark.MSSV,
      reviewMark: reviewMark,
    });

    if (status.data) {
      toast.success('Thực hiện trả lời phúc khảo thành công!', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      handleSendReplyGradeReviewNotification(
        e,
        infoReviewMark.typeMark,
        codeClass,
        infoMyClassroom.Title,
        account._id,
        infoReviewMark.id,
        account.Name,
      );
      handleClose();

      return;
    }

    toast.warn('Thực hiện trả lời phúc khảo thất bại!', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleSendReplyGradeReviewNotification = (
    e:any,
    markType: any,
    codeClass: any,
    className: string,
    senderID: any,
    recipientID: any,
    name: string,
  ) => {
    e.preventDefault();
    socket.emit('sendNotification', {
      notificationType: 'REPLY TO A STUDENT GRADE VIEW',
      createDate: Date(),
      read: false,
      recipientID: recipientID,
      senderID: senderID,
      message: `${name} đã phản hồi phúc khảo của bạn về điểm ${markType} trong`,
      className: className,
      url: `/myclassroom/${codeClass}/3/emsdoi`,
    });
    return socket.emit('sendNotification', {
      notificationType: 'FINAL DECISION A GRADE VIEW',
      createDate: Date(),
      read: false,
      recipientID: recipientID,
      senderID: senderID,
      message: `${name} đã quyết định phúc khảo của bạn về điểm ${markType} trong`,
      className: className,
      url: `/myclassroom/${codeClass}/3/emsdoi`,
    });
  };
  return (
    <>
      <Modal
        show={isOpen}
        onHide={setIsOpen}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        contentClassName="answer-review"
      >
        <Modal.Header className="answer-review__header" closeButton>
          <Modal.Title>Trả Lời Đơn Phúc Khảo - Điểm {infoReviewMark.typeMark}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="answer-review__body">
            <Form.Group className="mb-3" controlId="formCurrentMark">
              <Form.Label>Điểm chấm</Form.Label>
              <Form.Control type="text" value={infoReviewMark.currentMark} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDesiredMark">
              <Form.Label>Điểm mong muốn</Form.Label>
              <Form.Control type="text" value={infoReviewMark.desiredMark} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFinalMark">
              <Form.Label>Điểm chính thức</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                placeholder="Nhập điểm chính thức..."
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAnswer">
              <Form.Label>Giải thích</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Nhập trả lời..."
                style={{ height: '100px' }}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="answer-review__footer">
            <Button variant="secondary" onClick={handleClose}>
              Thoát
            </Button>
            <Button variant="primary" type="submit">
              Trả lời đơn phúc khảo
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
