import React, { FC } from 'react';
import { List } from './List/List';

import './ListMemberClass.scss';

interface IListMemberClass {}
export const ListMemberClass: React.FC<IListMemberClass> = () => {
  const list = [1, 2, 3, 4, 5];
  return (
    <div className="list-member-class">
      <div>
        <div className="list-member-class__title">
          Giáo viên <hr />
        </div>
        <List list={list}></List>
      </div>
      <div>
        <div className="list-member-class__title">
          Học viên
          <div className="list-member-class__title__total">159 học viên</div>
          <hr />
        </div>
        <List list={list}></List>
      </div>
    </div>
  );
};
