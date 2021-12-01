import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { List } from 'reselect/es/types';
import './UserBody.scss';

interface UserContent {
  title: string | undefined;
  content: List;
  handleBtn: any;
  isDisableBtn?: boolean;
}

export const UserBody = ({ title, content, handleBtn, isDisableBtn = false}: UserContent) => {
  return (
    <div className="user-body">
      <div className="user-body__content">
        <h3>{title}</h3>
        <Form onSubmit={handleBtn}>
          <Row>
            {content.map((item, moves) => {
              return (
                <Col md={item.md} key={moves}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{item.label}</Form.Label>
                    {item.type != 'textarea' ? (
                      <Form.Control
                        type={item.type}
                        placeholder={
                          item.placeholder == '' ? `Nhập ${item.label}` : item.placeholder
                        }
                        name={item.name}
                        id={item.name}
                        value={item.value}
                        disabled={item.disabled}
                        required={true}
                      />
                    ) : (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name={item.name}
                        id={item.name}
                        value={item.value}
                        placeholder={
                          item.placeholder == '' ? `Nhập ${item.label}` : item.placeholder
                        }
                        required={true}
                      />
                    )}
                  </Form.Group>
                </Col>
              );
            })}
          </Row>
          <div className="user-body__btn">
            <Button variant="primary mr-4" type="submit" disabled={isDisableBtn}>
              Cập Nhật
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
