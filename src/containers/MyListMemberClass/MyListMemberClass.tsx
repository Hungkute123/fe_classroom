import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ListMemberClass } from '../../components/ListMemberClass/ListMemberClass';
import { RootState } from '../../redux/rootReducer';
import { getMyInfo } from '../../redux/slice/appSlice/memberClassroomSlice';
import { useAppDispatch } from '../../redux/store';
import './MyListMemberClass.scss';

export const MyListMemberClass = () => {
  const dispatch = useAppDispatch();
  const codeclass = useParams();
  const classroom = {
    ...codeclass,
    jwt: localStorage.getItem('jwt'),
  };
  useEffect(() => {
    const checkTeacher = async () => {
      await dispatch(getMyInfo(classroom));
    };
    checkTeacher();

  }, []);
  return (
    <div className="my-list-member-class">
          <ListMemberClass />
    </div>
  );
};