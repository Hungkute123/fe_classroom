import React, { useEffect, useState } from 'react';
import { ListClass } from '../../components/ListClass/ListClass';
import { useSelector, useDispatch } from "react-redux";
import { getClassroomByIDUser } from '../../redux/slice/appSlice/classroomSlice';
import classroomApi from '../../services/aixos/classroomApi';
import './Home.scss';
import { RootState } from '../../redux/rootReducer';


export const Home = () => {
  const dispatch = useDispatch();
  const  {classroom}  = useSelector((state:RootState) => state.classroom);

  useEffect(() => {
    dispatch(getClassroomByIDUser());
  }, [dispatch]);
  
  return (
    <div>
      <ListClass listclass ={classroom}/>
    </div>
  );
};
