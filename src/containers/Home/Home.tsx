import React, { useEffect, useState } from 'react';
import './Home.scss';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { getClassroomByIDUser } from '../../redux/slice/appSlice/classroomSlice';
import classroomApi from '../../services/aixos/classroomApi';

import { Tabs } from '../../components/common';
import { ListClass, ListMemberClass, DetailClass, Login } from '../../components';

export const Home = () => {
  const dispatch = useDispatch();
  const { classroom } = useSelector((state: RootState) => state.classroom);

  useEffect(() => {
    dispatch(getClassroomByIDUser());
  }, [dispatch]);

  return (
    <div>
      <Login></Login>
      {/* <ListClass listclass ={classroom}/> */}
      {/* <Tabs
        titleTabs={['Bảng tin', 'Mọi người']}
        bodyTabs={[<DetailClass></DetailClass>, <ListMemberClass />]}
      ></Tabs> */}
    </div>
  );
};
