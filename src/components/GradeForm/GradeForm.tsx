import React, { useState } from 'react';
import './GradeForm.scss';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../redux/store';

interface IGrade {
  _id: string;
  index: number;
  MarkType: string;
  Mark: string;
}

export const GradeForm = ({_id, index, MarkType, Mark}: IGrade) => {
  const dispatch = useAppDispatch();

  const handleUpdate = async () => {};

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
                      <div className="grade-form__title">Loại điểm</div>
                      <Form.Control value={MarkType} />
                      <div className="grade-form__btn grade-form__btn--right">
                        <Button variant="primary">Lưu</Button>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="grade-form__body">
                      <div className="grade-form__title">Số điểm</div>
                      <Form.Control value={Mark} />
                      <div className="grade-form__btn grade-form__btn--left">
                        <Button variant="danger">Xóa</Button>
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
