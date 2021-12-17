import React, { useEffect, useRef, useState } from 'react';
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
import './MarkClass.scss';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { getClassStructure } from '../../redux/slice/appSlice/classStructureSlide';

// const csvStudentList = [
//   { 'Mã số sinh viên': '', 'Họ và tên': '' },
//   // {
//   //   columns: [
//   //       {title: "Province State", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
//   //       {title: "Country Region", style: {font: {sz: "18", bold: true}}, width: {wch: 30}}, // width in characters
//   //       {title: "Confirmed", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}}, // width in pixels
//   //       {title: "Deaths", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
//   //       {title: "Recovered", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}}, // width in pixels
//   //       {title: "Active", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
//   //       {title: "Incident Rate", style: {font: {sz: "18", bold: true}}, width: {wch: 30}}, // width in characters
//   //       {title: "Latitude", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
//   //       {title: "Longitude", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
//   //       {title: "Last Update", style: {font: {sz: "18", bold: true}}, width: {wpx: 110}}, // width in pixels

//   //   ],
//   //   data: [
//   //       {value: 1, style: {font: {sz: "14"}}},
//   //       {value: 2, style: {font: {sz: "14"}}},
//   //       {value: 2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "3461eb"}}}},
//   //       {value: 2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "eb1207"}}}},
//   //       {value: 2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "4bd909"}}}},
//   //       {value: 2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "ebc907"}}}},
//   //       {value: 2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "35bdb4"}}}},
//   //       {value: 2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "ed14f5"}}}},
//   //       {value: 2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "ed14f5"}}}},
//   //       {value: 2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "000000"}}}},
//   //   ]
//   // }
// ];

export const MarkClass = () => {
  const { codeclass }: { codeclass: string } = useParams();
  const fileInputRef: any = useRef();
  const csvStudentList = [{ 'Mã số sinh viên': '', 'Họ và tên': '' }];
  const [csvGradeStructure, setCsvGradeStructure] = useState<any>([]);
  const obj: any = { 'Mã số sinh viên': '' };
  const listGrade = useAppSelector((state: RootState) => state.classStructure.listGrade);
  const dispatch = useAppDispatch();
  const fetchClassStructure = async () => {
    const listGrade = (
      await dispatch(getClassStructure({ jwt: localStorage.getItem('jwt'), CodeClass: codeclass }))
    ).payload;
    listGrade.map((item: any, index: number) => {
      const temp = String(item.MarkType);
      obj[temp] = '';
    });
    const csvGradeStructure: any = [];
    csvGradeStructure.push(obj);
    setCsvGradeStructure(csvGradeStructure);

    console.log(obj);
    console.log(csvGradeStructure);
    console.log(csvStudentList);
  };
  useEffect(() => {
    fetchClassStructure();
  }, []);
  const handleDowloadTemplateStudentList = (csvData: any, fileName: any) => {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    ws['!cols'] = [{ width: 20 }, { width: 50 }];
    const wb = { Sheets: { student_list: ws }, SheetNames: ['student_list'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  const handleDowloadTemplateGradeStructureClass = (csvData: any, fileName: any) => {
    console.log(csvGradeStructure);
    console.log('hi', csvData);
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    ws['!cols'] = fitToColumn(csvData);
    const wb = { Sheets: { mark_list: ws }, SheetNames: ['mark_list'] };
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

    promise.then((d) => {
      console.log(d);
      //setItems(d);
    });
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
                        onClick={() =>
                          handleDowloadTemplateStudentList(csvStudentList, 'Sample Student List')
                        }
                      >
                        Dowload mẫu danh sách học viên
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() =>
                          handleDowloadTemplateGradeStructureClass(csvGradeStructure, 'Sample Mark')
                        }
                      >
                        Dowload mẫu chấm điểm
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="3">Dowload bảng điểm</Dropdown.Item>
                      <Dropdown.Item eventKey="4" onClick={() => fileInputRef.current.click()}>
                        Upload danh sách lớp
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="5">Upload danh sách điểm</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                  <Col sm={6} className="mark-class__th-one__left">
                    Sắp xếp theo họ
                    {/* <Button onClick={() => fileInputRef.current.click()}>
                      <input
                        onChange={(e: any) => {
                          const file = e.target.files[0];
                          readExcel(file);
                        }}
                        multiple={false}
                        ref={fileInputRef}
                        type="file"
                        hidden
                      />
                    </Button> */}
                  </Col>
                  <Col sm={4} className="mark-class__th-one__right">
                    Điểm trung bình
                  </Col>
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
                            <Dropdown.Item eventKey="1">Trả bài</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Xem bài tập đã nộp</Dropdown.Item>
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
                    Điểm trung bình của lớp
                  </Col>
                  <Col sm={4} className="mark-class__td-right">
                    15%
                  </Col>
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
                          <span className="mark-class__span">100</span>
                        </Col>
                        <Col sm={4} className="mark-class__td-mark"></Col>
                      </Row>
                    </Container>
                  </td>
                );
              })}

            <td className="mark-class__background"></td>
          </tr>
          <tr>
            <td>
              <Container className="mark-class__container">
                <Row className="mark-class__container">
                  <Col sm={8} className="mark-class__td-left">
                    <img
                      className="mark-class__icon-img"
                      src="https://lh3.googleusercontent.com/a/default-user=s32-c"
                      alt="ảnh"
                    />
                    Nguyễn Đình Hùng
                  </Col>
                  <Col sm={4} className="mark-class__td-right">
                    15%
                  </Col>
                </Row>
              </Container>
            </td>
            {listGrade &&
              listGrade.map((item: any, index: number) => {
                return (
                  <td key={index}>
                    <Container className="mark-class__container">
                      <Row className="mark-class__container">
                        <Col sm={8} className="mark-class__td-mark">
                          <div className="mark-class__input">
                            <input type="text" />
                          </div>
                          <span className="mark-class__span">/{item.Mark}</span>
                          <div className="mark-class__line"></div>
                        </Col>
                        <Col sm={4} className="mark-class__td-mark">
                          <span>
                            <DropdownButton
                              title={<BsThreeDotsVertical size={25} />}
                              id="bg-nested-dropdown"
                              variant=""
                            >
                              <Dropdown.Item eventKey="1">Trả bài</Dropdown.Item>
                            </DropdownButton>
                          </span>
                        </Col>
                      </Row>
                    </Container>
                  </td>
                );
              })}

            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
