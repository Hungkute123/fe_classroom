import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ListMemberClass } from '../../components/ListMemberClass/ListMemberClass';
import './MyListMemberClass.scss';

export const MyListMemberClass = () => {
  const dispatch = useDispatch();
  const codeclass = useParams();
  return (
    <div className="my-list-member-class">
          <ListMemberClass />
    </div>
  );
};