import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './GradeForm.scss';
export const GradeForm = () => {
  return (
    <>
      <Form>
        <div className="grade-form">
          <Container>
            <Row>
              <Col sm={6}>
                <div className="grade-form__body">
                  <div className="grade-form__title">Loại điểm</div>
                  <Form.Control />
                  <div className="grade-form__btn grade-form__btn--right">
                    <Button variant="primary">Chỉnh sửa</Button>
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="grade-form__body">
                  <div className="grade-form__title">Số điểm</div>
                  <Form.Control />
                  <div className="grade-form__btn grade-form__btn--left">
                    <Button variant="danger">Xóa</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Form>
    </>
  );
};
