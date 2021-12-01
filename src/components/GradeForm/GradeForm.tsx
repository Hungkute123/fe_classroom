import React, { useState } from 'react';
import './GradeForm.scss';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  getClassStructure,
  deleteClassStructure,
  patchClassStructure,
} from '../../redux/slice/appSlice/classStructureSlide';
import Swal from 'sweetalert2';

interface IGrade {
  _id: string;
  index: number;
  MarkType: string;
  Mark: string;
  CodeClass: string;
}

export const GradeForm = ({ _id, index, MarkType, Mark, CodeClass }: IGrade) => {
  const dispatch = useAppDispatch();
  const [typeMark, setTypeMark] = useState(MarkType);
  const [mark, setMark] = useState(Mark);
  const infoGrade = {
    jwt: localStorage.getItem('jwt'),
    CodeClass: CodeClass,
  };

  const handleUpdate = async () => {
    if (typeMark.length == 0 || mark.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'HÃY ĐIỀN ĐỦ THÔNG TIN',
      });

      return;
    }

    const grade = {
      jwt: localStorage.getItem('jwt'),
      _id: _id,
      CodeClass: CodeClass,
      MarkType: typeMark,
      Mark: mark,
    };

    const status = (await dispatch(patchClassStructure({ ...grade }))).payload;

    if (status) {
      Swal.fire({
        icon: 'success',
        title: 'XOÁ CẤU TRÚC ĐIỂM THÀNH CÔNG',
      });

      dispatch(getClassStructure({ ...infoGrade }));

      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'XOÁ CẤU TRÚC ĐIỂM THẤT BẠI',
    });
  };

  const handleRemove = async () => {
    const status = (
      await dispatch(deleteClassStructure({ jwt: localStorage.getItem('jwt'), _id: _id }))
    ).payload;

    if (status) {
      Swal.fire({
        icon: 'success',
        title: 'XOÁ CẤU TRÚC ĐIỂM THÀNH CÔNG',
      });

      dispatch(getClassStructure({ ...infoGrade }));

      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'XOÁ CẤU TRÚC ĐIỂM THẤT BẠI',
    });
  };

  return (
    <>
      <Draggable key={_id} draggableId={_id} index={index}>
        {(provided) => (
          <div className="grade-form" {...provided.draggableProps} ref={provided.innerRef}>
            <Form {...provided.dragHandleProps}>
              <Container>
                <Row>
                  <Col sm={6}>
                    <div className="grade-form__body">
                      <div className="grade-form__title">Loại điểm {_id}</div>
                      <Form.Control
                        value={typeMark}
                        onChange={(e) => setTypeMark(e.target.value)}
                      />
                      <div className="grade-form__btn grade-form__btn--right">
                        <Button variant="primary" onClick={handleUpdate}>
                          Lưu
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="grade-form__body">
                      <div className="grade-form__title">Số điểm</div>
                      <Form.Control value={mark} onChange={(e) => setMark(e.target.value)} />
                      <div className="grade-form__btn grade-form__btn--left">
                        <Button variant="danger" onClick={handleRemove}>
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Form>
          </div>
        )}
      </Draggable>
    </>
  );
};
