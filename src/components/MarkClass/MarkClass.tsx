import React, { useEffect, useState, useMemo } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { getClassStructure } from '../../redux/slice/appSlice/classStructureSlide';
import { getMyInfo } from '../../redux/slice/appSlice/memberClassroomSlice';
import { TableMark } from './TableMark/TableMark';
import { StudentMark } from './StudentMark/StudentMark';
import markApi from '../../services/aixos/markApi';
import classStructureApi from '../../services/aixos/classStructureApi';
import './MarkClass.scss';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
let socket:any;
export const MarkClass = () => {
  const dispatch = useAppDispatch();

  const { codeclass }: { codeclass: string } = useParams();
  const csvStudentList = [{ MSSV: '', Name: '' }];
  const obj: any = { MSSV: '' };

  const listGrade = useAppSelector((state: RootState) => state.classStructure.listGrade);
  const info = useAppSelector((state: RootState) => state.memberClassroom.myInfo);
  const { account } = useAppSelector((state: RootState) => state.account);
  const [isTeacher, setIsTeacher] = useState(false);
  const [listMark, setListMark] = useState<any>([]);
  const [keyStructure, setKeyStructure] = useState<any>([]);
  const [mark, setMark] = useState<any>({});
  const [totalMark, setTotalMark] = useState(0);

  const classroom = {
    codeclass: codeclass,
    jwt: localStorage.getItem('jwt'),
  };

  // Kiểm tra có phải giáo viên không?
  const checkTeacher = async () => {
    const isTeacher = (await dispatch(getMyInfo(classroom))).payload;

    if (isTeacher.Permission === 'Teacher') {
      setIsTeacher(true);
    }
  };

  // Lấy tên các loại điểm điểm
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

  // Gọi API lấy danh sách điểm
  const fetchListMark = async () => {
    const listMark = await markApi.getAllMark({
      jwt: localStorage.getItem('jwt'),
      CodeClass: codeclass,
    });

    setListMark(listMark);
  };

  // Hàm update điểm trong mảng
  const calcMark = () => {
    let mark: { [property: string]: any } = {};

    for (let i = 0; i < listMark.length; i++) {
      let totalMark = 0;

      if (typeof listMark[i].Point != 'undefined') {
        for (let j = 1; j < keyStructure.length; j++) {
          if (typeof listMark[i].Point[keyStructure[j]] === 'number') {
            mark[`${listMark[i].MSSV}-${keyStructure[j]}`] = listMark[i].Point[keyStructure[j]];
            totalMark += listMark[i].Point[keyStructure[j]];
          }
        }
      }

      mark[`${listMark[i].MSSV}-totalMark`] = totalMark;
    }

    setMark(mark);
  };
  // Tạo kết nối socket
  useEffect(() => {
    const ENDPOINT = String(process.env.URL_MY_SOCKET);
    socket = io(ENDPOINT, { transports: ['websocket'] });
    socket.on('connect', () => {
      console.log(socket.id); 
    });
   const id = `${account._id}id`;
    socket.emit('getNotification', { _id: id });
    // const action = connectNotification(account._id);
    // dispatch(action);
  }, []);

  useMemo(() => {
    checkTeacher();
    fetchClassStructure();
    fetchListMark();
  }, []);
  useMemo(() => {
    let total = 0;
    listGrade.map((item: any) => {
      total += item.Mark;
    });

    setTotalMark(total);
  }, [listGrade]);
  useMemo(() => {
    calcMark();
  }, [listMark]);

  // Dowdload template danh sách lớp
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

  // Download bảng điểm
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

    toast.warn('Bảng điểm rỗng!', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Dowdload template mẫu chấm điểm
  const handleSampleMark = (markType: string) => {
    let sampleMark: { [property: string]: any } = {};
    sampleMark['MSSV'] = '';
    sampleMark[markType] = '';

    return handleDowloadTemplate([sampleMark], 'Sample Mark');
  };

  // Upload bảng điểm
  const readExcel = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e: any) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then(async (d: any) => {
      const key = Object.keys(d[0]);

      if (key[0] === 'MSSV' && key[1] === 'Name') {
        const status = await markApi.addListStudent({
          jwt: localStorage.getItem('jwt'),
          ListStudent: d,
          CodeClass: codeclass,
        });

        if (status.data) {
          toast.success('Upload danh sách lớp thành công!', {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          fetchListMark();

          return;
        }
      } else if (key[0] === 'MSSV') {
        let checkFile = false;
        let structure = '';

        for (let i = 0; i < keyStructure.length; i++) {
          if (key[1] === keyStructure[i]) {
            checkFile = true;
            structure = keyStructure[i];
            break;
          }
        }

        if (checkFile) {
          const status = await markApi.addMark({
            jwt: localStorage.getItem('jwt'),
            ListMark: d,
            CodeClass: codeclass,
            KeyStructure: structure,
          });

          if (status.data) {
            toast.success('Upload danh sách điểm thành công!', {
              position: 'bottom-left',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            fetchListMark();

            return;
          }
        }
      }

      toast.warn('File không đúng cấu trúc!', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  // Chức năng Hoàn thành/Đóng hoàn thành
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
      toast.success(`Cập nhật trạng thái cột điểm thành công!`, {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      fetchClassStructure();
    } else {
      toast.warn('Cập nhật trạng thái cột điểm thất bại!', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Cập nhật lại giá trị điểm trên db
  const handleUpdateMark = async (MSSV: string, MarkType: string) => {
    const markItem = listMark.find((mark: any) => (mark.MSSV = MSSV));

    if (markItem) {
      let Point: { [property: string]: any } = {};
      Point[`${MarkType}`] = mark[`${MSSV}-${MarkType}`];

      console.log(Point);

      const markUpdate = {
        jwt: localStorage.getItem('jwt'),
        codeClass: codeclass,
        MSSV: MSSV,
        Point: Point,
      };

      const status = await markApi.updateMark({ ...markUpdate });

      if (status.data) {
        toast.success('Cập nhật điểm thành công!', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

    toast.warn('Cập nhật điểm thất bại!', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Cập nhật lại điểm trong mảng
  const handleChangeInput = (e: any, MSSV: string, MarkType: string, maxMark: number) => {
    if (mark[`${MSSV}-totalMark`] === 0) {
      mark[`${MSSV}-totalMark`] += Number(e.target.value);
      mark[`${MSSV}-${MarkType}`] = Number(e.target.value);

      setMark({ ...mark });
      return;
    }

    if (Number(e.target.value) >= 0 && Number(e.target.value) <= maxMark) {
      mark[`${MSSV}-totalMark`] += Number(e.target.value);

      if (typeof mark[`${MSSV}-${MarkType}`] === 'number') {
        mark[`${MSSV}-totalMark`] -= mark[`${MSSV}-${MarkType}`];
      }

      mark[`${MSSV}-${MarkType}`] = Number(e.target.value);

      setMark({ ...mark });
      return;
    }

    toast.warn('Dữ liệu nhập không đúng!', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
const handleSendFinalGradeNotification = (event: any, listStudent: any, markType:any,codeClass:any, className:string, id:any) => {
    event.preventDefault();
    if(listStudent.length != 0){
      listStudent.map((item:any)=>{
        if(item.IDUser != ""){
          return (socket.emit('sendNotification', {
            notificationType: 'FINAL A GRADE COMPOSITION',
            createDate: Date(),
            read: false,
            recipientID: item.IDUser,
            senderID: id,
            message: `Cột điểm ${markType} của bạn vừa được đánh dấu hoàn thành trong`,
            className: className,
            url: `/myclassroom/${codeClass}/3/emsdoi`,
          }))
        }
      })
    }
  };
  return (
    <>
      {isTeacher ? (
        <TableMark
          handleDowloadTemplate={handleDowloadTemplate}
          handleGradeBoard={handleGradeBoard}
          listGrade={listGrade}
          csvStudentList={csvStudentList}
          handleComplete={handleComplete}
          listMark={listMark}
          mark={mark}
          keyStructure={keyStructure}
          readExcel={readExcel}
          handleSampleMark={handleSampleMark}
          handleChangeInput={handleChangeInput}
          totalMark={totalMark}
          handleUpdateMark={handleUpdateMark} 
          handleSendFinalGradeNotification={handleSendFinalGradeNotification}
          userId={account._id}  
          />
      ) : (
        <StudentMark />
      )}
    </>

    // onClick={(e: any) =>
    //   handleUpdateMark(item.MSSV, itemGrade.MarkType)
    // }
  );
};
