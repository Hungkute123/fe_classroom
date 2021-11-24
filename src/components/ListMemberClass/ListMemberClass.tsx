import React, { FC, useEffect, useState } from 'react';
import { BsPersonPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AddStudentModal } from '..';
import { RootState } from '../../redux/rootReducer';
import {
  getMyInfo,
  getStudentByCodeClass,
  getTeacherByCodeClass,
} from '../../redux/slice/appSlice/memberClassroomSlice';
import { useAppDispatch } from '../../redux/store';
import { AddTeacherModal } from '../AddTeacherModal/AddTeacherModal';
import { List } from './List/List';

import './ListMemberClass.scss';

interface IListMemberClass {
  
}
export const ListMemberClass: React.FC<IListMemberClass> = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isOpenTeacherModal, setIsOpenTeacherModal] = useState(false);
  const [isOpenStudentModal, setIsOpenStudentModal] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const codeclass = useParams();
  const classroom = {
    ...codeclass,
    jwt: localStorage.getItem('jwt'),
  };
  const { teacher, student, myInfo } = useSelector((state: RootState) => state.memberClassroom);
 
  useEffect(() => {
    const fectchPeople = async () => {
      const check = (await dispatch(getTeacherByCodeClass(classroom))).payload;
      const isTeacher =  (await dispatch(getMyInfo(classroom))).payload;
      if (!check) {
        // history.push({
        //   pathname: `/`,
        // });
      }
      if (isTeacher.Permission === 'Teacher') {
        setIsTeacher(true);
      }
    };
    fectchPeople();
    
    dispatch(getStudentByCodeClass(classroom));
  }, []);

  return (
    <div className="list-member-class">
      <AddTeacherModal isOpen={isOpenTeacherModal} setIsOpen={setIsOpenTeacherModal} />
      <AddStudentModal isOpen={isOpenStudentModal} setIsOpen={setIsOpenStudentModal} />
      <div>
        <div className="list-member-class__title">
          Giáo viên
          <div className="list-member-class__title__total">
            {teacher.length} giáo viên
            {isTeacher && (
              <button onClick={() => setIsOpenTeacherModal(true)}>
                <BsPersonPlus color="#1967d2" size="22px" />
              </button>
            )}
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
            {isTeacher && (
              <button onClick={() => setIsOpenStudentModal(true)}>
                <BsPersonPlus color="#1967d2" size="22px" />
              </button>
            )}
          </div>
          <hr />
        </div>
        <List list={student}></List>
      </div>
    </div>
  );
};
