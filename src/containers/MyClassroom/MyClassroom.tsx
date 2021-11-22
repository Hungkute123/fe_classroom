import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Tabs } from '../../components/common/Tabs/Tabs';
import { DetailClass } from '../../components/DetailClass/DetailClass';
import { ListMemberClass } from '../../components/ListMemberClass/ListMemberClass';
import { RootState } from '../../redux/rootReducer';
import { getClassroomByCodeClass } from '../../redux/slice/appSlice/classroomSlice';
import './MyClassroom.scss';

export const MyClassroom = () => {
  const dispatch = useDispatch();
  const codeclass = useParams();
  console.log(codeclass)
  const { infoMyClassroom } = useSelector((state: RootState) => state.classroom);
  useEffect(() => {
    dispatch(getClassroomByCodeClass(codeclass));
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
          />
          {/* <ListMemberClass />, */}
       
    </div>
  );
};
