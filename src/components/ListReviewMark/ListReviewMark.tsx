import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import reviewMarkApi from '../../services/aixos/reviewMarkApi';
import { AnswerReview } from './AnswerReview/AnswerReview';
import { ToastContainer } from 'react-toastify';
import './ListReviewMark.scss';

export const ListReviewMark = () => {
  const className = 'list-review-mark';
  const { codeclass }: { codeclass: string } = useParams();
  const [listReviewMark, setListReviewMark] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [infoReviewMark, setInfoReviewMark] = useState<any>({});

  const handleReviewMark = (
    typeMark: string,
    currentMark: number,
    desiredMark: number,
    name: string,
    MSSV: string,
  ) => {
    setIsOpen(true);
    setInfoReviewMark({
      typeMark,
      currentMark,
      desiredMark,
      name,
      MSSV,
    });
  };

  const fetchListReviewMark = async () => {
    const listReviewMark = await reviewMarkApi.getALLMark({
      jwt: localStorage.getItem('jwt'),
      CodeClass: codeclass,
    });

    setListReviewMark(listReviewMark);
  };

  useMemo(() => {
    fetchListReviewMark();
  }, [isOpen]);

  return (
    <div className="container">
      <ToastContainer />
      {isOpen && (
        <AnswerReview
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          codeClass={codeclass}
          infoReviewMark={infoReviewMark}
        />
      )}
      <div className="row row-content-mark">
        <div className="col-lg-12">
          <div className={`${className}`}>
            <div className={`${className}__header`}>
              <div className={`${className}__left`}>
                <p className={`${className}__name`}>Danh Sách Học Sinh Phúc Khảo</p>
                <h4 className={`${className}__text-primary`}>Dental Care</h4>
              </div>
            </div>
            <div className={`${className}__body`}>
              <div className={`${className}__responsive`}>
                <table className={`${className}__table`}>
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">MSSV</th>
                      <th scope="col">Tên Sinh Viên</th>
                      <th scope="col">Loại Điểm</th>
                      <th scope="col">Điểm Chấm</th>
                      <th scope="col">Điểm Kì Vọng</th>
                      <th scope="col">Giải Thích</th>
                      <th scope="col">Trả Lời</th>
                      <th scope="col">Điểm Cuối Cùng</th>
                      <th scope="col">Tình Trạng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listReviewMark.map((item: any, index: number) => {
                      return (
                        <tr key={`list-review-mark-${index}`}>
                          <td>{index + 1}</td>
                          <td>{item.MSSV}</td>
                          <td>{item.Name}</td>
                          <td>{item.TypeMark}</td>
                          <td>{item.CurrentMark}</td>
                          <td>{item.DesiredMark}</td>
                          <td>{item.CommentStudent}</td>
                          <td>
                            {item.Answer ? (
                              item.Answer
                            ) : (
                              <div className={`${className}__check`}>
                                <i
                                  className="fas fa-reply-all"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    handleReviewMark(
                                      item.TypeMark,
                                      item.CurrentMark,
                                      item.DesiredMark,
                                      item.Name,
                                      item.MSSV,
                                    )
                                  }
                                ></i>
                              </div>
                            )}
                          </td>
                          <td>{item.Mark}</td>
                          <td>
                            <div className={`${className}__check`}>
                              {item.Status ? (
                                <i className="fas fa-check-circle"></i>
                              ) : (
                                <i className="fas fa-times-circle"></i>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className={`${className}__info`}>Hiển thị 1 đến 10 trong học sinh</div>
                <div className={`${className}__paginate`}>
                  <div className={`${className}__previous`}>Trang Trước</div>
                  <span className={`${className}__rank`}>
                    <Link to={'#'} className={`${className}__current ${className}__btn`}>
                      1
                    </Link>
                    <Link to={'#'} className={`${className}__btn`}>
                      2
                    </Link>
                    <Link to={'#'} className={`${className}__btn`}>
                      3
                    </Link>
                  </span>
                  <div className={`${className}__next`}>Trang Sau</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
