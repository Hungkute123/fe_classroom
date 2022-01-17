import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import reviewMarkApi from '../../../services/aixos/reviewMarkApi';
import './AnswerReview.scss';

interface IAnswerReview {
  isOpen: boolean;
  setIsOpen: any;
  codeClass: string;
  infoReviewMark: any;
}

export const AnswerReview = ({ isOpen, setIsOpen, codeClass, infoReviewMark }: IAnswerReview) => {
  const handleClose = () => {
    setIsOpen(false);
  };

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
