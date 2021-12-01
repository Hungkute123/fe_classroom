import React, { useState } from 'react';
import './CreateGrade.scss';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../../redux/store';
import {
  getClassStructure,
  saveClassStructure,
} from '../../redux/slice/appSlice/classStructureSlide';

export const CreateGrade = () => {
  const dispatch = useAppDispatch();
  const { codeclass }: { codeclass: string } = useParams();
  const [typeMark, setTypeMark] = useState('');
  const [mark, setMark] = useState('');

  const handleCreate = async () => {
    if (typeMark == '' || mark == '') {
      Swal.fire({
        icon: 'error',
        title: 'HÃY ĐIỀN ĐỦ THÔNG TIN',
      });

      return;
    }

    const grade = {
      jwt: localStorage.getItem('jwt'),
      CodeClass: codeclass,
      MarkType: typeMark,
      Mark: mark,
    };

    const status = (await dispatch(saveClassStructure({ ...grade }))).payload;

    if (status) {
      Swal.fire({
        icon: 'success',
        title: 'THÊM CẤU TRÚC ĐIỂM THÀNH CÔNG',
      });

      dispatch(getClassStructure({ jwt: localStorage.getItem('jwt'), CodeClass: codeclass }));

      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'THÊM CẤU TRÚC ĐIỂM THẤT BẠI',
    });
  };

  const handleReset = () => {
    setTypeMark('');
    setMark('');
  };

  return (
    <div className="grade-form">
      <Form>
        <Container>
          <Row>
            <Col sm={6}>
              <div className="grade-form__body">
                <div className="grade-form__title">Loại điểm</div>
                <Form.Control value={typeMark} onChange={(e) => setTypeMark(e.target.value)} />
                <div className="grade-form__btn grade-form__btn--right">
                  <Button variant="primary" onClick={handleCreate}>
                    Tạo mới
                  </Button>
                </div>
              </div>
            </Col>
            <Col sm={6}>
              <div className="grade-form__body">
                <div className="grade-form__title">Số điểm</div>
                <Form.Control value={mark} onChange={(e) => setMark(e.target.value)} />
                <div className="grade-form__btn grade-form__btn--left">
                  <Button variant="danger" onClick={handleReset}>
                    Xóa dữ liệu
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
};
