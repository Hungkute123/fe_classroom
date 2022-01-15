import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './TableMark.scss';

interface ITableMark {
  handleDowloadTemplate: any;
  handleGradeBoard: any;
  listGrade: Array<any>;
  csvStudentList: any;
  handleComplete: any;
  listMark: Array<any>;
  mark: any;
  keyStructure: any;
  readExcel: any;
  handleSampleMark: any;
  handleChangeInput: any;
  totalMark: number;
}

export const TableMark = ({
  handleDowloadTemplate,
  handleGradeBoard,
  listGrade,
  csvStudentList,
  handleComplete,
  listMark,
  mark,
  keyStructure,
  readExcel,
  handleSampleMark,
  handleChangeInput,
  totalMark,
}: ITableMark) => {
  const className = 'table-mark';
  const fileInputRef: any = useRef();

  return (
    <div className="row row-content-mark">
      <input
        onChange={(e: any) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
        multiple={false}
        ref={fileInputRef}
        type="file"
        hidden
        accept=".csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
      />

      <div className="col-lg-10">
        <div className="table-mark">
          <div className={`${className}__header`}>
            <div className={`${className}__left`}>
              <p className={`${className}__name`}>Bảng Điểm</p>
              <h4 className={`${className}__text-primary`}>Dental Care</h4>
            </div>
            <div className={`${className}__right`}>
              <button
                className="btn btn-outline-primary mr-8"
                onClick={() => handleDowloadTemplate(csvStudentList, 'Sample Student List')}
              >
                Dowload mẫu danh sách học viên
              </button>
              <button className="btn btn-outline-primary mr-8" onClick={() => handleGradeBoard()}>
                Dowload bảng điểm
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => fileInputRef.current.click()}
              >
                Upload danh sách lớp
              </button>
            </div>
          </div>
          <div className={`${className}__body`}>
            <div className={`${className}__responsive`}>
              <table className={`${className}__table`}>
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">MSSV</th>
                    <th scope="col">Họ Tên</th>
                    {listGrade.map((item: any, index: number) => {
                      return (
                        <th scope="col" key={`${index}-type-mark`}>
                          <div className={`${className}__flex`}>
                            <div className="col-lg-8">{item.MarkType}</div>
                            <div className="col-lg-4">
                              <DropdownButton
                                title={<BsThreeDotsVertical size={25} />}
                                id="bg-nested-dropdown"
                                variant=""
                              >
                                <Dropdown.Item
                                  eventKey="1"
                                  onClick={() =>
                                    handleComplete(
                                      item._id,
                                      item.CodeClass,
                                      item.MarkType,
                                      item.Mark,
                                      !item.Complete,
                                    )
                                  }
                                >
                                  {item.Complete ? 'Đóng hoàn thành' : 'Hoàn thành'}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  eventKey="2"
                                  onClick={() => handleSampleMark(item.MarkType)}
                                >
                                  Dowload mẫu chấm điểm
                                </Dropdown.Item>
                                <Dropdown.Item
                                  eventKey="3"
                                  onClick={() => fileInputRef.current.click()}
                                >
                                  Upload danh sách điểm
                                </Dropdown.Item>
                              </DropdownButton>
                            </div>
                          </div>
                        </th>
                      );
                    })}
                    <th scope="col">Điểm trung bình</th>
                  </tr>
                </thead>
                <tbody>
                  {listMark &&
                    listGrade &&
                    listMark.map((item: any, index: number) => {
                      return (
                        <tr key={`student-${index}`}>
                          <td>{index + 1}</td>
                          <td>{item.MSSV}</td>
                          <td>{item.Name}</td>
                          {listGrade.map((itemGrade: any, indexGrade: number) => {
                            return (
                              <td>
                                <div className={`${className}__input`}>
                                  <input
                                    type="number"
                                    id=""
                                    name=""
                                    value={mark[`${item.MSSV}-${keyStructure[indexGrade + 1]}`]}
                                    onChange={(e) =>
                                      handleChangeInput(e, item.MSSV, keyStructure[indexGrade + 1])
                                    }
                                  />
                                  <p>/{itemGrade.Mark}</p>
                                </div>
                              </td>
                            );
                          })}

                          <td>{mark[`${item.MSSV}-totalMark`]/totalMark}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className={`${className}__info`}>
                Hiển thị 1 đến 10 trong {listMark.length} học sinh
              </div>
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
  );
};
