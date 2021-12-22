import React, { useEffect, useState } from 'react';
import './GradeStructure.scss';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';
import { GradeForm, CreateGrade } from '../../components';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { RootState } from '../../redux/rootReducer';
import {
  getClassStructure,
  patchClassStructure,
} from '../../redux/slice/appSlice/classStructureSlide';
import { Button } from 'react-bootstrap';

interface IGrade {
  _id: string;
  CodeClass: string;
  MarkType: string;
  Mark: string;
}

export const GradeStructure = () => {
  const { codeclass }: { codeclass: string } = useParams();
  const listGrade = useAppSelector((state: RootState) => state.classStructure.listGrade);
  const [grade, setGrade] = useState<IGrade[]>(listGrade);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getListGrade = async () => {
      const listGrade = (
        await dispatch(
          getClassStructure({ jwt: localStorage.getItem('jwt'), CodeClass: codeclass }),
        )
      ).payload;
      setGrade(listGrade);
    };
    getListGrade();
  }, [listGrade.length]);

  const handleOnDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    var items = Array.from(grade);

    let id: Array<string> = [];
    for (let i = 0; i < items.length; i++) {
      id.push(items[i]._id);
    }

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    for (let i = 0; i < items.length; i++) {
      items[i] = {
        ...items[i],
        _id: id[i],
      };
    }

    for (let i = 0; i < items.length; i++) {
      dispatch(patchClassStructure({ jwt: localStorage.getItem('jwt'), ...items[i] }));
    }

    setGrade(items);
  };

  return (
    <div className="grade-structure">
      <div className="grade-structure__header">
        <div className="grade-structure__header__title">
          Cấu trúc điểm
          <div className="grade-structure__header__btn">
            <Link to={`/myclassroom/${codeclass}/1/antbntig`}>
              <Button variant="light">Trở lại lớp học</Button>
            </Link>
          </div>
        </div>
        <h2>Nhập cấu trúc điểm của lớp học của bạn</h2>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={'GRADE'}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {grade && grade.map((item, index) => {
                return (
                  <GradeForm
                    _id={item._id}
                    index={index}
                    MarkType={item.MarkType}
                    Mark={item.Mark}
                    CodeClass={item.CodeClass}
                    key={item.MarkType}
                  ></GradeForm>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <CreateGrade></CreateGrade>
    </div>
  );
};
