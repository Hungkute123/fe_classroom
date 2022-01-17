import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './Comment.scss';

interface IComment {
  listReviewMark: Array<any>;
}

export const Comment = ({ listReviewMark }: IComment) => {
  const className = 'comment-review-mark';

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className={`${className}`}>
          <div className={`${className}__body`}>
            <div className={`${className}__responsive`}>
              <table className={`${className}__table`}>
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Loại Điểm</th>
                    <th scope="col">Điểm Kì Vọng</th>
                    <th scope="col">Giải Thích</th>
                    <th scope="col">Trả Lời</th>
                    <th scope="col">Điểm Cuối Cùng</th>
                    <th scope="col">Tình Trạng</th>
                  </tr>
                </thead>
                <tbody>
                  {listReviewMark.map((item, index) => {
                    return (
                      <tr key={`review-mark-${index}`}>
                        <td>{index + 1}</td>
                        <td>{item.TypeMark}</td>
                        <td>{item.DesiredMark}</td>
                        <td>{item.CommentStudent}</td>
                        <td>{item.Answer}</td>
                        <td>{item.FinalMark}</td>
                        <td>
                          {item.Status ? (
                            <i className={`${className}__icon fas fa-check-circle`}></i>
                          ) : (
                            <i className={`${className}__icon fas fa-times-circle`}></i>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
