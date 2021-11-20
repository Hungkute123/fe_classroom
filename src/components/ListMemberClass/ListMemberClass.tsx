import React, { FC, useEffect, useState } from 'react';
import { BsPersonPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AddStudentModal } from '..';
import { RootState } from '../../redux/rootReducer';
import {
  getStudentByCodeClass,
  getTeacherByCodeClass,
} from '../../redux/slice/appSlice/memberClassroomSlice';
import { AddTeacherModal } from '../AddTeacherModal/AddTeacherModal';
import { List } from './List/List';

import './ListMemberClass.scss';

interface IListMemberClass {}
export const ListMemberClass: React.FC<IListMemberClass> = () => {
  const dispatch = useDispatch();
  const [isOpenTeacherModal, setIsOpenTeacherModal] = useState(false);
  const [isOpenStudentModal, setIsOpenStudentModal] = useState(false);
  const codeclass = useParams();
  const { teacher, student } = useSelector((state: RootState) => state.memberClassroom);
  useEffect(() => {
    dispatch(getTeacherByCodeClass(codeclass));
    dispatch(getStudentByCodeClass(codeclass));
  }, []);
  
  return (
    <div className="list-member-class">
      <AddTeacherModal isOpen={isOpenTeacherModal} setIsOpen={setIsOpenTeacherModal}/>
      <AddStudentModal isOpen={isOpenStudentModal} setIsOpen={setIsOpenStudentModal}/>
      <div>
        <div className="list-member-class__title">
          Giáo viên 
          <div className="list-member-class__title__total">
            {teacher.length} giáo viên
            <button onClick={() => setIsOpenTeacherModal(true)}>
              <BsPersonPlus color="#1967d2" size="22px" />
            </button>
          </div>
          <hr />
        </div>
        <List list={teacher}></List>
      </div>
      <div>
        <div className="list-member-class__title">
          Học viên
          <div className="list-member-class__title__total">
            {student.length} học viên
            <button onClick={() => setIsOpenStudentModal(true)}>
              <BsPersonPlus color="#1967d2" size="22px" />
            </button>
          </div>
          <hr />
        </div>
        <List list={student}></List>
      </div>
    </div>
  );
};
