import React, { useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { getListAdminAccounts } from '../../../redux/slice/appSlice/accountSlice';
import { useAppDispatch } from '../../../redux/store';
import { FilterComponent } from '../FilterComponent/FilterComponent';
import './ManageAdminAccounts.scss';

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
    button: true,
    center: true,
    cell: () => (
      <div className="App">
        <div className="openbtn text-center">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            control
          </button>
          <div className="modal" tabIndex={-1} id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal title</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Modal body text goes here.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

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

  return (
    <div className="manage-admin-accounts">
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
