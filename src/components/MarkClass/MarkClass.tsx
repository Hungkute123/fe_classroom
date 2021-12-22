import React, { useEffect, useRef, useState } from 'react';
import './MarkClass.scss';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Table,
} from 'react-bootstrap';
import { BsFillPeopleFill, BsThreeDotsVertical } from 'react-icons/bs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { getClassStructure } from '../../redux/slice/appSlice/classStructureSlide';
import Swal from 'sweetalert2';
import markApi from '../../services/aixos/markApi';
import classStructureApi from '../../services/aixos/classStructureApi';

export const MarkClass = () => {
  const { codeclass }: { codeclass: string } = useParams();
  const fileInputRef: any = useRef();
  const csvStudentList = [{ MSSV: '', Name: '' }];
  const obj: any = { MSSV: '' };
  const listGrade = useAppSelector((state: RootState) => state.classStructure.listGrade);
  const info = useAppSelector((state: RootState) => state.memberClassroom.myInfo);
  const dispatch = useAppDispatch();
  const [listMark, setListMark] = useState<any>();
  const [keyStructure, setKeyStructure] = useState<any>([]);

  const fetchClassStructure = async () => {
    const listGrade = (
      await dispatch(getClassStructure({ jwt: localStorage.getItem('jwt'), CodeClass: codeclass }))
    ).payload;
    listGrade.map((item: any, index: number) => {
      const temp = String(item.MarkType);
      obj[temp] = '';
    });
    setKeyStructure(Object.keys(obj));
  };

  const fetchListMark = async () => {
    const listMark = await markApi.getAllMark({ CodeClass: codeclass });
    setListMark(listMark);
  };

  useEffect(() => {
    fetchClassStructure();
    fetchListMark();
  }, []);

  const handleDowloadTemplate = (csvData: any, fileName: any) => {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    ws['!cols'] = fitToColumn(csvData);
    const wb = { Sheets: { Sheet1: ws }, SheetNames: ['Sheet1'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const fitToColumn = (arrayOfArray: any) => {
    // get maximum character of each column
    return arrayOfArray.map((a: any, i: any) => ({
      wch: Math.max(a ? a.toString().length : 0),
    }));
  };

  const handleGradeBoard = () => {
    if (listMark.length != 0 && keyStructure.length != 0) {
      const gradeBoard: Array<any> = [];

      listMark.map((item: any, index: number) => {
        let mark: { [property: string]: any } = {};

        mark['Họ và tên'] = item.Name;
        mark['Mã số sinh viên'] = item.MSSV;

        for (let i = 1; i < keyStructure.length; i++) {
          mark[keyStructure[i]] = item.Point ? item.Point[keyStructure[i]] : '';
        }

        gradeBoard.push(mark);
      });

      return handleDowloadTemplate(gradeBoard, 'Grade Board');
    }

    Swal.fire({
      icon: 'error',
      title: 'BẢNG ĐIỂM RỖNG',
    });
  };

  const handleSampleMark = (markType: string) => {
    let sampleMark: { [property: string]: any } = {};
    sampleMark['MSSV'] = '';
    sampleMark[markType] = '';

    return handleDowloadTemplate([sampleMark], 'Sample Mark');
  };

  const readExcel = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      console.log(file);
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e: any) => {
        console.log(e);
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        console.log(error);
        reject(error);
      };
    });

    promise.then(async (d: any) => {
      const key = Object.keys(d[0]);
      console.log(d);

      if (key[0] === 'MSSV' && key[1] === 'Name') {
        const status = await markApi.addListStudent({
          ListStudent: d,
          CodeClass: codeclass,
        });

        if (status.data) {
          Swal.fire({
            icon: 'success',
            title: 'IMPORT FILE THÀNH CÔNG',
          });

          return;
        }
      } else if (key[0] === 'MSSV') {
        const keyStructure = Object.keys(obj);

        for (let i = 0; i < key.length; i++) {
          if (key[i] != keyStructure[i]) {
            Swal.fire({
              icon: 'error',
              title: 'FILE KHÔNG ĐÚNG CẤU TRÚC',
            });

            return;
          }
        }

        const status = await markApi.addMark({
          ListMark: d,
          CodeClass: codeclass,
          ListKeyStructure: keyStructure,
        });

        if (status.data) {
          Swal.fire({
            icon: 'success',
            title: 'IMPORT FILE THÀNH CÔNG',
          });

          return;
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'FILE KHÔNG ĐÚNG CẤU TRÚC',
      });
      //setItems(d);
    });
  };

  const handleComplete = async (
    _id: any,
    CodeClass: string,
    MarkType: string,
    Mark: number,
    Complete: boolean,
  ) => {
    const status = await classStructureApi.patchClassStructure({
      jwt: localStorage.getItem('jwt'),
      _id: _id,
      CodeClass: CodeClass,
      MarkType: MarkType,
      Mark: Mark,
      Complete: Complete,
    });

    if (status) {
      Swal.fire({
        icon: 'success',
        title: 'CẬP NHẬT TRẠNG THÁI XEM ĐIỂM THÀNH CÔNG',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'CẬP NHẬT TRẠNG THÁI XEM ĐIỂM THẤT BẠI',
      });
    }
  };

  return (
    <div className="mark-class">
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
      <table>
        <thead>
          <tr>
            <th className="mark-class__th-one">
              <Container>
                <Row>
                  <Col sm={2} className="mark-class__btn">
                    <DropdownButton
                      title={<BsThreeDotsVertical size={25} />}
                      id="bg-nested-dropdown"
                      variant=""
                    >
                      <Dropdown.Item
                        eventKey="1"
                        onClick={() => handleDowloadTemplate(csvStudentList, 'Sample Student List')}
                      >
                        Dowload mẫu danh sách học viên
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={() => handleGradeBoard()}>
                        Dowload bảng điểm
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="3" onClick={() => fileInputRef.current.click()}>
                        Upload danh sách lớp
                      </Dropdown.Item>
                    </DropdownButton>
                  </Col>
                  <Col sm={6} className="mark-class__th-one__left">
                    Danh sách
                  </Col>
                  {/* <Col sm={4} className="mark-class__th-one__right">
                    Điểm tổng
                  </Col> */}
                </Row>
              </Container>
            </th>
            {listGrade &&
              listGrade.map((item: any, index: number) => {
                return (
                  <th className="mark-class__th-two" key={index}>
                    <div className="mark-class__th-two__container">
                      <div className="mark-class__th-two__top">
                        <div className="mark-class__th-two__title">{item.MarkType}</div>
                        <div className="mark-class__th-two__option">
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
                            <Dropdown.Item eventKey="4">Xem bài tập đã nộp</Dropdown.Item>
                          </DropdownButton>
                        </div>
                      </div>
                    </div>
                  </th>
                );
              })}

            <th className="mark-class__th-three"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="mark-class__background">
              <Container className="mark-class__container">
                <Row className="mark-class__container">
                  <Col sm={8} className="mark-class__td-left">
                    <BsFillPeopleFill
                      className="mark-class__icon-img"
                      size={32}
                      color={'#1967d2'}
                    />
                    Điểm tổng của bài tập
                  </Col>
                  {/* <Col sm={4} className="mark-class__td-right">
                    15%
                  </Col> */}
                </Row>
              </Container>
            </td>
            {listGrade &&
              listGrade.map((item: any, index: number) => {
                return (
                  <td className="mark-class__background" key={index}>
                    <Container className="mark-class__container">
                      <Row className="mark-class__container">
                        <Col sm={8} className="mark-class__td-mark">
                          <div className="mark-class__input"></div>
                          <span className="mark-class__span">{item.Mark}</span>
                        </Col>
                        <Col sm={4} className="mark-class__td-mark"></Col>
                      </Row>
                    </Container>
                  </td>
                );
              })}

            <td className="mark-class__background"></td>
          </tr>

          {listMark &&
            listGrade &&
            listMark.map((item: any, index: number) => {
              return (
                <tr>
                  <td key={`student-${index}`}>
                    <Container className="mark-class__container">
                      <Row className="mark-class__container">
                        <Col sm={8} className="mark-class__td-left">
                          <img
                            className="mark-class__icon-img"
                            src={
                              item.Image || 'https://lh3.googleusercontent.com/a/default-user=s32-c'
                            }
                            alt={item.Name}
                          />
                          {item.Name}
                        </Col>
                        {/* <Col sm={4} className="mark-class__td-right">
                          15%
                        </Col> */}
                      </Row>
                    </Container>
                  </td>

                  {listGrade.map((itemGrade: any, indexGrade: number) => {
                    return (
                      <td key={`grade-${index}`}>
                        <Container className="mark-class__container">
                          <Row className="mark-class__container">
                            <Col sm={12} className="mark-class__td-mark">
                              <div className="mark-class__input">
                                <input
                                  type="text"
                                  value={
                                    item.Point &&
                                    (info.Permission == 'Teacher' || itemGrade.Complete)
                                      ? item.Point[keyStructure[indexGrade + 1]]
                                      : '__'
                                  }
                                />
                              </div>
                              <div className="mark-class__line"></div>
                            </Col>
                            {/* <Col sm={4} className="mark-class__td-mark">
                              <span>
                                <DropdownButton
                                  title={<BsThreeDotsVertical size={25} />}
                                  id="bg-nested-dropdown"
                                  variant=""
                                >
                                  <Dropdown.Item eventKey="1">Trả bài</Dropdown.Item>
                                </DropdownButton>
                              </span>
                            </Col> */}
                          </Row>
                        </Container>
                      </td>
                    );
                  })}
                  <td></td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
