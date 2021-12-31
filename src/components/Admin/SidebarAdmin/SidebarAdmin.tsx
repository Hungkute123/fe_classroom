import React from 'react';
import { Nav } from 'react-bootstrap';
import { BsHouse } from 'react-icons/bs';
import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  FaList,
  FaUserPlus,
  FaUserCog,
  FaRegUserCircle,
  FaRegRegistered,
  FaSignOutAlt,
  FaRegKissWinkHeart,
} from 'react-icons/fa';
import './SidebarAdmin.scss';
import { Link, useHistory } from 'react-router-dom';

interface ISidebarAdmin {
  image?: any;
  collapsed?: any;
  rtl?: any;
  toggled?: any;
  handleToggleSidebar?: any;
}
export const SidebarAdmin: React.FC<ISidebarAdmin> = ({
  image,
  collapsed,
  rtl,
  toggled,
  handleToggleSidebar,
}) => {
  const history = useHistory();
  const handleLogout = () =>{
    window.localStorage.clear();
    history.push({
      pathname: `/admin/login`,
    });
  }
  return (
    <>
      <ProSidebar
        //image={image ? sidebarBg : false}
        rtl={rtl}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: '#b3b8d4',
            }}
          >
            Administrator
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <SubMenu title={'Quản lý tài khoản admin'} icon={<FaList />}>
              <MenuItem icon={<FaUserPlus />}>{'Tạo tài khoản'} <Link to="create-admin-account"/></MenuItem>
              <MenuItem icon={<FaUserCog />}>{'Danh sách tài khoản'} <Link to="manage-admin-accounts"/></MenuItem>
            </SubMenu>
            <MenuItem icon={<FaRegUserCircle />}>{'Quản lý tài khoản user'}<Link to="manage-user-accounts"/></MenuItem>
            <MenuItem icon={<FaRegRegistered />}>{'Quản lý lớp học'}<Link to="manage-classes"/></MenuItem>
            <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>{'Đăng xuất'}</MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a
              href="https://www.facebook.com/nguyenhaanhkiem0701"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaRegKissWinkHeart />
              <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                Đời buồn
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};
