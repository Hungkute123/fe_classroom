import React, { useState, useMemo } from 'react';
import './StudentMark.scss';
import { Comment } from '../Comment/Comment';
import classStructureApi from '../../../services/aixos/classStructureApi';
import markApi from '../../../services/aixos/markApi';
import reviewMarkApi from '../../../services/aixos/reviewMarkApi';

import { ReviewMark } from '../ReviewMark/ReviewMark';

interface IStudentMark {
  info: any;
  codeClass: string;
}

export const StudentMark = ({ info, codeClass }: IStudentMark) => {
  const className = 'student-mark';
  const [listReviewMark, setListReviewMark] = useState<any>([]);
  const [markUser, setMarkUser] = useState<any>({});
  const [keyStructure, setKeyStructure] = useState<any>([]);
  const [totalMark, setTotalMark] = useState(0);
  const [mark, setMark] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [markCurrent, setMarkCurrent] = useState(0);
  const [typeMark, setTypeMark] = useState('');

  // Lấy tên các loại điểm điểm
  const fetchData = async () => {
    const markUser = await markApi.getMark({
      jwt: localStorage.getItem('jwt'),
      CodeClass: codeClass,
      MSSV: info.MSSV,
    });

    const listGrade: any = await classStructureApi.getClassStructure({
      jwt: localStorage.getItem('jwt'),
      CodeClass: codeClass,
    });

    const classStructure: any = [];
    let totalMark = 0;
    let mark = 0;

    listGrade.data.map((item: any) => {
      totalMark += item.Mark;

      if (item.Complete) {
        classStructure.push(item.MarkType);

        if (typeof markUser.Point[`${item.MarkType}`] === 'number' && item.Complete) {
          mark += markUser.Point[`${item.MarkType}`];
        }
      }
    });

    setMarkUser(markUser);
    setKeyStructure(classStructure);
    setTotalMark(totalMark);
    setMark(mark);
  };

  const fetchListReviewMark = async () => {
    const listReviewMark = await reviewMarkApi.getMark({
      jwt: localStorage.getItem('jwt'),
      CodeClass: codeClass,
      MSSV: info.MSSV,
    });

    setListReviewMark(listReviewMark);
  };

  useMemo(() => {
    fetchData();
  }, []);

  useMemo(() => {
    fetchListReviewMark();
  }, [isOpen]);

  const handleReviewMark = (typeMark: string, mark: number) => {
    setIsOpen(true);
    setTypeMark(typeMark);
    setMarkCurrent(mark);
  };

  return (
    <div className="container">
      {isOpen && (
        <ReviewMark
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          typeMark={typeMark}
          mark={markCurrent}
          info={info}
          codeClass={codeClass}
        />
      )}

      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-8 col-sm-8">
          <div className={`${className}`}>
            <div className={`${className}__header`}>
              <div className={`${className}__logo`}>
                <img src={info.Image} className="img-fluid rounded-circle" alt="Logo" />
              </div>
              <h3 className={`${className}__title`}>Bảng Điểm</h3>
              <h3 className={`${className}__mark`}>
                {info.Name} - {info.MSSV}
              </h3>
              {keyStructure.length != 0 && (
                <p className={`${className}__mark`}>
                  Điểm tổng kết: {mark}/{totalMark}
                </p>
              )}
            </div>
            <ul className={`${className}__list`}>
              {keyStructure.length != 0 &&
                keyStructure.map((item: any, index: number) => {
                  return (
                    <li className={`${className}__item`} key={index}>
                      <div className={`${className}__item-content`}>
                        <div className={`${className}__text`}>
                          <h5 className="mb-1">
                            <>{item}:</>
                            <strong> {markUser.Point[`${item}`]}đ</strong>
                          </h5>
                        </div>
                        <div className={`${className}__btn`}>
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => handleReviewMark(item, markUser.Point[`${item}`])}
                          >
                            Phúc Khảo
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div className={`${className}__footer`}>
              <Comment listReviewMark={listReviewMark}></Comment>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
