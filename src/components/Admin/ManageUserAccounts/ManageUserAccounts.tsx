import React, { useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { getListUserAccounts } from '../../../redux/slice/appSlice/accountSlice';
import { useAppDispatch } from '../../../redux/store';
import { FilterComponent } from '../FilterComponent/FilterComponent';
import './ManageUserAccounts.scss';

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
    selector: (row: any) => row.MSSV,
    sortable: true,
    //right: true,
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

export const ManageUserAccounts = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>([]);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = data.filter(
    (item: any) =>  item.MSSV.toLowerCase().includes(filterText.toLowerCase()),
  );
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
