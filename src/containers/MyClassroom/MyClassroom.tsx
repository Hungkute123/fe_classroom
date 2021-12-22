import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Tabs } from '../../components/common/Tabs/Tabs';
import { DetailClass } from '../../components/DetailClass/DetailClass';
import { ListMemberClass } from '../../components/ListMemberClass/ListMemberClass';
import { RootState } from '../../redux/rootReducer';
import { getClassroomByCodeClass } from '../../redux/slice/appSlice/classroomSlice';
import { getMyInfo } from '../../redux/slice/appSlice/memberClassroomSlice';
import { useAppDispatch } from '../../redux/store';
import './MyClassroom.scss';

export const MyClassroom = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const codeclass = useParams();
  const [isTeacher, setIsTeacher] = useState(false);
  const classroom = {
    ...codeclass,
    jwt: localStorage.getItem('jwt'),
  };
  const { infoMyClassroom } = useSelector((state: RootState) => state.classroom);
  const fectchInfo = async () => {
    const check = (await dispatch(getClassroomByCodeClass(classroom))).payload;
    const isTeacher = (await dispatch(getMyInfo(classroom))).payload;
    if (!check) {
      history.push({
        pathname: `/`,
      });
    }
    if (isTeacher.Permission === 'Teacher') {
      setIsTeacher(true);
    }
  };
  useEffect(() => {
    fectchInfo();
  }, []);
  return (
    <div className="my-classroom">
      <DetailClass
        CodeClass={infoMyClassroom.CodeClass}
        Title={infoMyClassroom.Title}
        Image={infoMyClassroom.Image}
        Theme={infoMyClassroom.Theme}
        Part={infoMyClassroom.Part}
        Room={infoMyClassroom.Room}
        IsTeacher={isTeacher}
      />
    </div>
  );
};
