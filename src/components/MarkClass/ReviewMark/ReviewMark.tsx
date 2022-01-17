import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import reviewMarkApi from '../../../services/aixos/reviewMarkApi';
import './ReviewMark.scss';

interface IReviewMark {
  isOpen: boolean;
  setIsOpen: any;
  typeMark?: string;
  mark?: number;
  info: any;
  codeClass: string;
}

export const ReviewMark = ({ isOpen, setIsOpen, typeMark, mark, info, codeClass }: IReviewMark) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const reviewMark = {
      Name: info.Name,
      MSSV: info.MSSV,
      TypeMark: typeMark,
      CodeClass: codeClass,
      CurrentMark: e.target[0].value,
      DesiredMark: e.target[1].value,
      CommentStudent: e.target[2].value,
      Status: false,
    };

    const status = await reviewMarkApi.addMark({
      jwt: localStorage.getItem('jwt'),
      reviewMark: reviewMark,
    });

    if (status.data) {
      toast.success('Thực hiện phúc khảo thành công!', {
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

    toast.warn('Thực hiện phúc khảo thất bại!', {
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
        contentClassName="review-mark"
      >
        <Modal.Header className="review-mark__header" closeButton>
          <Modal.Title>Đơn Phúc Khảo - Điểm {typeMark}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="review-mark__body">
            <Form.Group className="mb-3" controlId="formCurrentMark">
              <Form.Label>Điểm hiện tại</Form.Label>
              <Form.Control type="text" value={mark} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDesiredMark">
              <Form.Label>Điểm mong muốn</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                placeholder="Nhập điểm mong muốn..."
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formComment">
              <Form.Label>Giải thích</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Nhập lời giải thích..."
                style={{ height: '100px' }}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="review-mark__footer">
            <Button variant="secondary" onClick={handleClose}>
              Thoát
            </Button>
            <Button variant="primary" type="submit">
              Gửi phúc khảo
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
