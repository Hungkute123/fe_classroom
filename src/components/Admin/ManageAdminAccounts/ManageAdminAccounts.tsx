import moment from 'moment';
import React, { useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { BsFillTrashFill, BsLock, BsUnlock } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import {
  deleteAccount,
  getListAdminAccounts,
  updateAccount,
} from '../../../redux/slice/appSlice/accountSlice';
import { useAppDispatch } from '../../../redux/store';
import { Modal } from '../../common';
import { FilterComponent } from '../FilterComponent/FilterComponent';
import './ManageAdminAccounts.scss';
import 'react-toastify/dist/ReactToastify.css';

export const ManageAdminAccounts = () => {
  const dispatch = useAppDispatch();
  const [dataAdminAccount, setDataAdminAccount] = useState<any>([]);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = dataAdminAccount.filter((item: any) =>
    item.Email.toLowerCase().includes(filterText.toLowerCase()),
  );
  const fetchListAdminAccount = async () => {
    const dataListAdminAccount = (await dispatch(getListAdminAccounts())).payload;
    dataListAdminAccount.map((item: any, index: number) => {
      return dataAdminAccount.push(item);
    });
    setDataAdminAccount([...dataAdminAccount]);
  };
  useEffect(() => {
    fetchListAdminAccount();
    return () => {
      setDataAdminAccount([]);
    };
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
        placeholder="Tìm theo email"
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
      const filtered = dataAdminAccount.filter(function (el: any) {
        if (el._id === account._id) {
          el.Status = !el.Status;
        }
        return el;
      });
      setDataAdminAccount(filtered);
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
      const filtered = dataAdminAccount.filter(function (el: any) {
        return el._id != account._id;
      });
      setDataAdminAccount(filtered);
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
      name: 'Ngày tạo',
      selector: (row: any) => moment(row.CreateDate).format('hh:mm:ss DD/MM/YYYY'),
      sortable: true,
    },
    {
      name: 'Tình trạng',
      selector: (row: any) => (row.Status ? 'Hoạt động' : 'Đã khóa'),
      sortable: false,
    },
    {
      name: 'Khóa/Mở tài khoản',
      width: '150px',
      button: true,
      center: true,
      cell: (row: any) => (
        <Modal
          button={row.Status ? <BsLock /> : <BsUnlock />}
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
          button={<BsFillTrashFill />}
          title={'Xóa tài khoản'}
          body={`Bạn có chắc chắn muốn xóa tài khoản ${row.Email} không?`}
          handleClick={(e: any) => handleClickDelAccount(e, row)}
          id={`del${row._id}`}
        ></Modal>
      ),
    },
  ];
  return (
    <div className="manage-admin-accounts">
      <ToastContainer />
      <DataTable
        title="Quản lý tài khoản admin"
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
