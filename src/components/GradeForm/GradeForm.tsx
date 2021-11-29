import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './GradeForm.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const GradeForm = () => {
  const listGrade = [
    {
      id: 1,
      Mark: '10',
      MarkPoint: '',
      Codeclass: 'abcd',
    },
    {
      id: 2,
      Mark: '9',
      MarkPoint: '',
      Codeclass: 'abcd',
    },
    {
      id: 3,
      Mark: '8',
      MarkPoint: '',
      Codeclass: 'abcd',
    },
    {
      id: 4,
      Mark: '7',
      MarkPoint: '',
      Codeclass: 'abcd',
    },
  ];

  const [grade, updateGrade] = useState(listGrade);

  console.log(grade);

  function handleOnDragEnd(result: any) {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    let items = Array.from(grade);
    const idSource = items[source.index].id;
    const idDestination = items[destination.index].id;
    [items[source.index], items[destination.index]] = [
      items[destination.index],
      items[source.index],
    ];

    items[source.index] = {
      ...items[source.index],
      id: idSource,
    };

    items[destination.index] = {
      ...items[destination.index],
      id: idDestination,
    };

    // const [reorderedItem] = items.splice(source.index, 1);
    // items.splice(destination.index, 0, reorderedItem);

    updateGrade(items);
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={'GRADE'}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {grade.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        className="grade-form"
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <Form {...provided.dragHandleProps}>
                          <Container>
                            <Row>
                              <Col sm={6}>
                                <div className="grade-form__body">
                                  <div className="grade-form__title">Loại điểm</div>
                                  <Form.Control />
                                  <div className="grade-form__btn grade-form__btn--right">
                                    <Button variant="primary">Lưu</Button>
                                  </div>
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className="grade-form__body">
                                  <div className="grade-form__title">Số điểm</div>
                                  <Form.Control value={item.Mark} />
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
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
