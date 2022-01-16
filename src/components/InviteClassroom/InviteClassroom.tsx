import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {useLocation} from "react-router-dom";
import { joinClassroom } from '../../redux/slice/appSlice/memberClassroomSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import './InviteClassroom.scss';

export const InviteClassroom = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  const { isAccount } = useSelector((state: RootState) => state.account);
  const search = useLocation().search;
  const codeclass = new URLSearchParams(search).get('codeclass');
  let permission = new URLSearchParams(search).get('permission');
  if(permission === null){
    permission = "student";
  }
  const classroom = {
    codeclass: codeclass,
    permission: permission,
    jwt: localStorage.getItem('jwt')
  };
  
  const handleJoin = async() =>{
      const check = (await dispatch(joinClassroom(classroom))).payload;
        history.push({
          pathname: `/myclassroom/${codeclass}/1/antbntig`,
        });
  }
  const handleNotLogged = () => {
    if (isAccount !== "true") {
      history.push({
        pathname: `/account/login`,
      });
    }
  };
  useEffect(() => {
    handleNotLogged();
    console.log(isAccount);
  }, []);
  return (
    <div className="invite-classroom">
      <div className="invite-classroom__content">
        <div className="invite-classroom__title">
          <h1>Tham gia lớp học</h1>
        </div>
        <div className="invite-classroom__body">
          <p>Bạn có chắc chắn tham gia lớp học ?</p>
        </div>
        <div className="invite-classroom__btn">
          <Button variant="primary" onClick={handleJoin}>Tham gia</Button>
          </div>
      </div>
    </div>
  );
};
