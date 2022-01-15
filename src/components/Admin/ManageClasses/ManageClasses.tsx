import React, { useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { BsFillTrashFill, BsLock, BsUnlock } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import { deleteClass, getListClass, updateClass } from '../../../redux/slice/appSlice/classroomSlice';
import { useAppDispatch } from '../../../redux/store';
import { Modal } from '../../common';
import { FilterComponent } from '../FilterComponent/FilterComponent';
import './ManageClasses.scss';

export const ManageClasses = () => {
  const dispatch = useAppDispatch();
  const [dataClasses, setDataClasses] = useState<any>([]);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = dataClasses.filter((item: any) =>
    item.Title.toLowerCase().includes(filterText.toLowerCase()),
  );
  const fetchListClasses = async () => {
    const dataListClasses = (await dispatch(getListClass())).payload;
    dataListClasses.map((item: any, index: number) => {
      return dataClasses.push(item);
    });
    setDataClasses([...dataClasses]);
  };
  useEffect(() => {
    fetchListClasses();
  }, []);
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        placeholder="Tìm theo tên lớp"
      />
    );
  }, [filterText, resetPaginationToggle]);
  const handleClickBlockClassroom = async (e: any, classroom: any) => {
    e.preventDefault();
    const classroomNew = {
      Status: !classroom.Status,
    };
    const key = {
      _id: classroom._id,
    };

    const update = (
      await dispatch(
        updateClass({ jwt: localStorage.getItem('jwt'), key: key, classroom: classroomNew }),
      )
    ).payload;
    const message = classroom.Status ? 'Khóa tài khoản ' : 'Mở khóa tài khoản ';
    if (update) {
      toast.success(`${message}thành công`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const filtered = dataClasses.filter(function (el: any) {
        if (el._id === classroom._id) {
          el.Status = !classroom.Status;
        }
        return el;
      });
      setDataClasses(filtered);
      return;
    }

    toast.error(`${message}thất bại`, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleClickDelClassroom = async (e: any, classroom: any) => {
    e.preventDefault();

    const update = (
      await dispatch(deleteClass({ jwt: localStorage.getItem('jwt'), id: classroom._id }))
    ).payload;
    const message = 'Xóa tài khoản ';
    if (update) {
      toast.success(`${message}thành công`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const filtered = dataClasses.filter(function (el: any) {
        return el._id != classroom._id;
      });
      setDataClasses(filtered);
      return;
    }

    toast.error(`${message}thất bại`, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const columns = [
    {
      name: 'Mã lớp',
      selector: (row: any) => row.CodeClass,
      sortable: true,
    },
    {
      name: 'Tên lớp',
      selector: (row: any) => row.Title,
      sortable: true,
    },
    {
      name: 'Người sở hữu',
      selector: (row: any) => row.info[0].Name,
      sortable: true,
    },
    {
      name: 'Tình trạng',
      width: '100px',
      selector: (row: any) => (row.Status ? 'Hoạt động' : 'Đã khóa'),
      sortable: false,
    },
    {
      name: 'Khóa/Mở lớp học',
      width: '150px',
      button: true,
      center: true,
      cell: (row: any) => (
        <Modal
          button={row.Status ? <BsLock /> : <BsUnlock />}
          title={row.Status ? 'Khóa lớp học' : 'Mở khóa lớp học'}
          body={
            row.Status
              ? `Bạn có chắc chắn muốn khóa lớp học ${row.Title} không?`
              : `Bạn có chắc chắn muốn mở lớp học ${row.Title} không?`
          }
          handleClick={(e: any) => handleClickBlockClassroom(e, row)}
          id={`idClass${row._id}`}
        ></Modal>
      ),
    },
    {
      name: 'Xóa lớp học',
      button: true,
      center: true,
      cell: (row: any) => (
        <Modal
          button={<BsFillTrashFill />}
          title={'Xóa lớp học'}
          body={`Bạn có chắc chắn muốn xóa lớp học ${row.Title} không?`}
          handleClick={(e: any) => handleClickDelClassroom(e, row)}
          id={`delClass${row._id}`}
        ></Modal>
      ),
    },
  ];

  return (
    <div className="manage-classes">
      <ToastContainer />
      <DataTable
        title="Quản lý lớp học"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        persistTableHead
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};
