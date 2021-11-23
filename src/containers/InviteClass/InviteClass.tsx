import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { InviteClassroom } from '../../components';
import './InviteClass.scss';

export const InviteClass = () => {
  
  return (
    <div className="invite-class">
        <InviteClassroom></InviteClassroom>
    </div>
  );
};