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
      setTypeMark('');
      setMark('');
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
    <div className="create-grade">
      <Form>
        <Container>
          <Row>
            <Col sm={6}>
              <div className="create-grade__body">
                <div className="create-grade__title">Loại điểm</div>
                <Form.Control
                  maxLength={15}
                  onChange={(e) => setTypeMark(e.target.value)}
                  value={typeMark}
                />
                <div className="create-grade__btn create-grade__btn--right">
                  <Button variant="primary" onClick={handleCreate}>
                    Tạo mới
                  </Button>
                </div>
              </div>
            </Col>
            <Col sm={6}>
              <div className="create-grade__body">
                <div className="create-grade__title">Số điểm</div>
                <Form.Control
                  type="number"
                  maxLength={4}
                  onChange={(e) => setMark(e.target.value)}
                  value={mark}
                  min="0"
                  max="1000"
                />
                <div className="create-grade__btn create-grade__btn--left">
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
