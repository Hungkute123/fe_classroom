import React, { FC } from 'react';
import { Table } from 'react-bootstrap';

import './List.scss';
interface IList {
  list?: Array<any>;
}
export const List: React.FC<IList> = ({ list }) => {
  return (
    <div className="list">
      <Table responsive>
        {/* <thead>
          <tr>
            <th>#</th>
            {Array.from({ length: 6 }).map((_, index) => (
              <th key={index}>Table heading</th>
            ))}
          </tr>
        </thead> */}
        <tbody>
          {list &&
            list.map((item: any, i: number) => {
              return (
                  <tr className="list__row" key={i}> 
                    <td>
                      <span className="list__row__header">
                        <span>
                          <img
                            src={item.Image}
                            alt="ảnh"
                          />
                        </span>
                        <span className="list__row__name">{item.Name}</span>
                      </span>
                    </td>
                  </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};
