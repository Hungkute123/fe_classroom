import React, { useState, useMemo, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {
  BsFileEarmarkText,
  BsFileExcel,
  BsFillTrashFill,
  BsLock,
  BsPencilFill,
  BsUnlock,
} from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import {
  deleteAccount,
  getListUserAccounts,
  updateAccount,
  updateMSSV,
} from '../../../redux/slice/appSlice/accountSlice';
import { useAppDispatch } from '../../../redux/store';
import { Modal } from '../../common';
import { FilterComponent } from '../FilterComponent/FilterComponent';
import './ManageUserAccounts.scss';

export const ManageUserAccounts = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>([]);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = data.filter((item: any) => item.MSSV.includes(filterText));
  const fetchListUserAccount = async () => {
    const dataListUserAccount = (await dispatch(getListUserAccounts())).payload;
    dataListUserAccount.map((item: any, index: number) => {
      return data.push(item);
    });
    setData([...data]);
  };
  useEffect(() => {
    fetchListUserAccount();
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
        placeholder="Tìm theo mã số sinh viên"
      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleClickBlockAccount = async (e: any, account: any) => {
    e.preventDefault();
    const accountNew = {
      Status: !account.Status,
    };
    const key = {
      Email: account.Email,
    };

    const update = (
      await dispatch(
        updateAccount({ jwt: localStorage.getItem('jwt'), key: key, account: accountNew }),
      )
    ).payload;
    const message = account.Status ? 'Khóa tài khoản ' : 'Mở khóa tài khoản ';
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
      const filtered = data.filter(function (el: any) {
        if (el._id === account._id) {
          el.Status = !el.Status;
        }
        return el;
      });
      setData(filtered);
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
  const handleClickDelAccount = async (e: any, account: any) => {
    e.preventDefault();

    const update = (
      await dispatch(deleteAccount({ jwt: localStorage.getItem('jwt'), id: account._id }))
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
      const filtered = data.filter(function (el: any) {
        return el._id != account._id;
      });
      setData(filtered);
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
  const handleClickSaveMSSV = async (e: any, account: any) => {
    e.preventDefault();
    const update = (
      await dispatch(
        updateMSSV({ jwt: localStorage.getItem('jwt'), Email: account.Email, MSSV: account.MSSV }),
      )
    ).payload;
    if (update) {
      toast.success(`Cập nhập mã số sinh viên thành công`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    toast.error(`Mã số sinh viên đã có người sở hữu`, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleClickDeleteMSSV = async (e: any, account: any) => {
    e.preventDefault();

    const accountNew = {
      MSSV: '',
    };
    const key = {
      Email: account.Email,
    };

    const update = (
      await dispatch(
        updateAccount({ jwt: localStorage.getItem('jwt'), key: key, account: accountNew }),
      )
    ).payload;
    if (update) {
      toast.success(`Xóa mã số sinh viên thành công`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const filtered = data.filter(function (el: any) {
        if (el._id === account._id) {
          el.MSSV = '';
        }
        return el;
      });
      setData(filtered);
      return;
    }

    toast.error(`Xóa mã số sinh viên thất bại`, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleChangeMSSV = (id: any, value: string) => {
    const filtered = data.filter(function (el: any) {
      if (el._id === id) {
        el.MSSV = value;
      }
      return el;
    });
    setData(filtered);
  };
  const columns = [
    {
      name: 'Email',
      selector: (row: any) => row.Email,
      sortable: true,
    },
    {
      name: 'Họ và tên',
      selector: (row: any) => row.Name,
      sortable: true,
    },
    {
      name: 'Mã số sinh viên',
      width: '200px',
      sortable: true,
      cell: (row: any) => (
        <div className="manage-user-accounts__fullwidth">
          <p style={{ width: '114px' }}>
            <input
              style={{ width: '100px', borderBottom: '1px solid #ccc' }}
              type="number"
              value={row.MSSV}
              onChange={(e) => handleChangeMSSV(row._id, String(e.target.value))}
            />
          </p>
          <i
            style={{ width: '40px' }}
            className="fas fa-save"
            onClick={(e) => handleClickSaveMSSV(e, row)}
            title="Cập nhập mã số sinh viên"
          ></i>
          {/* <i style={{ width: '40px' }}>
            <BsFileEarmarkText onClick={(e) => handleClickSaveMSSV(e, row)} />
          </i> */}
          <i title="Xóa mã số sinh viên">
            <BsFileExcel onClick={(e) => handleClickDeleteMSSV(e, row)} />
          </i>
        </div>
      ),
    },
    {
      name: 'Tình trạng',
      selector: (row: any) => (row.Status ? 'Hoạt động' : 'Đã khóa'),
      sortable: false,
      width: '100px',
    },
    {
      name: 'Khóa/Mở tài khoản',
      width: '125px',
      button: true,
      center: true,
      cell: (row: any) => (
        <Modal
          button={row.Status ? <BsLock title="Khóa tài khoản"/> : <BsUnlock title="Mở khóa tài khoản"/>}
          title={row.Status ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
          body={
            row.Status
              ? `Bạn có chắc chắn muốn khóa tài khoản ${row.Email} không?`
              : `Bạn có chắc chắn muốn mở tài khoản ${row.Email} không?`
          }
          handleClick={(e: any) => handleClickBlockAccount(e, row)}
          id={`id${row._id}`}
        ></Modal>
      ),
    },
    {
      name: 'Xóa tài khoản',
      button: true,
      center: true,
      cell: (row: any) => (
        <Modal
          button={<BsFillTrashFill title="Xóa tài khoản"/>}
          title={'Xóa tài khoản'}
          body={`Bạn có chắc chắn muốn xóa tài khoản ${row.Email} không?`}
          handleClick={(e: any) => handleClickDelAccount(e, row)}
          id={`del${row._id}`}
        ></Modal>
      ),
    },
  ];

  return (
    <div className="manage-user-accounts">
      <DataTable
        title="Quản lý tài khoản user"
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
