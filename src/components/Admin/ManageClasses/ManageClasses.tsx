import React, { useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { getListClass } from '../../../redux/slice/appSlice/classroomSlice';
import { useAppDispatch } from '../../../redux/store';
import { FilterComponent } from '../FilterComponent/FilterComponent';
import './ManageClasses.scss';

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
    selector: (row: any) => row.Name,
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

export const ManageClasses = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>([]);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = data.filter((item: any) =>
    item.MSSV.toLowerCase().includes(filterText.toLowerCase()),
  );
  const fetchListClasses = async () => {
    const dataListClasses = (await dispatch(getListClass())).payload;
    dataListClasses.map((item: any, index: number) => {
      return data.push(item);
    });
    setData([...data]);
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

  return (
    <div className="manage-classes">
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
