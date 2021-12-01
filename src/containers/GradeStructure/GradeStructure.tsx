import React, { useEffect, useState } from 'react';
import './GradeStructure.scss';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { GradeForm, CreateGrade } from '../../components';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { RootState } from '../../redux/rootReducer';
import {
  getClassStructure,
  patchClassStructure,
} from '../../redux/slice/appSlice/classStructureSlide';

interface IGrade {
  _id: string;
  CodeClass: string;
  MarkType: string;
  Mark: string;
}

export const GradeStructure = () => {
  const { codeclass }: { codeclass: string } = useParams();
  const [grade, setGrade] = useState<IGrade[]>([]);
  const status = useAppSelector((state: RootState) => state.classStructure.listGrade);
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
  }, []);

  console.log(grade);

  function handleOnDragEnd(result: any) {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    let items = Array.from(grade);
    const idSource = items[source.index]._id;
    const idDestination = items[destination.index]._id;
    [items[source.index], items[destination.index]] = [
      items[destination.index],
      items[source.index],
    ];

    items[source.index] = {
      ...items[source.index],
      _id: idSource,
    };

    items[destination.index] = {
      ...items[destination.index],
      _id: idDestination,
    };

    setGrade(items);
    dispatch(patchClassStructure({ jwt: localStorage.getItem('jwt'), ...items[source.index] }));
    dispatch(
      patchClassStructure({ jwt: localStorage.getItem('jwt'), ...items[destination.index] }),
    );
  }

  return (
    <div className="grade-structure">
      <div className="grade-structure__header">
        <div className="grade-structure__header__title">Cấu trúc điểm</div>
        <h2>Nhập cấu trúc điểm của lớp học của bạn</h2>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={'GRADE'}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {grade.map((item, index) => {
                return (
                  <GradeForm
                    _id={item._id}
                    index={index}
                    MarkType={item.MarkType}
                    Mark={item.Mark}
                    CodeClass={item.CodeClass}
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
