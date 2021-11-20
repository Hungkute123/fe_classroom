import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { List } from 'reselect/es/types';
import './UserBody.scss';

interface UserContent {
  title: string | undefined;
  content: List;
  handleBtn: any;
}

export const UserBody = ({ title, content, handleBtn }: UserContent) => {
  return (
    <div className="user-body">
      <div className="user-body__content">
        <h3>{title}</h3>
        <Row>
          {content.map((item, moves) => {
            return (
              <Col md={item.md} key={moves}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{item.label}</Form.Label>
                  {item.type != 'textarea' ? (
                    <Form.Control
                      type={item.type}
                      placeholder={`Nhập ${item.label}`}
                      name={item.name}
                      value={item.value}
                    />
                  ) : (
                    <Form.Control as="textarea" rows={3} />
                  )}
                </Form.Group>
              </Col>
            );
          })}
        </Row>
        <div className="user-body__btn">
          <Button variant="primary mr-4" onClick={handleBtn}>
            Cập Nhật
          </Button>
          <Button variant="dark">Hủy</Button>
        </div>
      </div>
    </div>
  );
};
