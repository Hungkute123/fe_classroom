import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../../redux/rootReducer';
import { getClassStructure } from '../../../redux/slice/appSlice/classStructureSlide';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import './Grade.scss';
interface IGrade {
  IsTeacher?: boolean;
}
export const Grade: React.FC<IGrade> = ({ IsTeacher = false }) => {
  const { codeclass }: { codeclass: string } = useParams();
  const listGrade = useAppSelector((state: RootState) => state.classStructure.listGrade);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getClassStructure({ jwt: localStorage.getItem('jwt'), CodeClass: codeclass }));
  }, []);
  return (
    <div className="grade">
      <div className="grade__body">
        <div className="grade__header">Cấu trúc điểm</div>
        {listGrade.length === 0 ? (
          <div className="grade__content">Không có</div>
        ) : (
          listGrade.map((item: any, index: number) => {
            return (
              <div className="grade__content" key={index}>
                {item.MarkType}: <div className="grade__content--right">{item.Mark}</div>
              </div>
            );
          })
        )}
        {IsTeacher && (
          <Link to={`/myclassroom/${codeclass}/grade`}>
            <div className="grade__btn">Chỉnh sửa</div>
          </Link>
        )}
      </div>
    </div>
  );
};
