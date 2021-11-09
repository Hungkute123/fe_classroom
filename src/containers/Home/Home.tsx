import React, { useEffect, useState } from 'react';
import { ListClass } from '../../components/ListClass/ListClass';
import { useSelector, useDispatch } from 'react-redux';
import { getClassroomByIDUser } from '../../redux/slice/appSlice/classroomSlice';
import classroomApi from '../../services/aixos/classroomApi';
import './Home.scss';
import { RootState } from '../../redux/rootReducer';
import { ListMemberClass } from '../../components/ListMemberClass/ListMemberClass';
import { Tabs } from '../../components/common';
import { DetailClass } from '../../components/DetailClass/DetailClass';

export const Home = () => {
  const dispatch = useDispatch();
  const { classroom } = useSelector((state: RootState) => state.classroom);

  useEffect(() => {
    dispatch(getClassroomByIDUser());
  }, [dispatch]);

  return (
    <div>
      {/* <ListClass listclass ={classroom}/> */}
      <Tabs
        titleTabs={['Bảng tin', 'Mọi người']}
        bodyTabs={[<DetailClass></DetailClass>, <ListMemberClass />]}
      ></Tabs>
    </div>
  );
};
