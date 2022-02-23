import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  Offcanvas,
} from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsBell, BsPlusLg } from 'react-icons/bs';
import { Link, useHistory, useParams } from 'react-router-dom';
import { CreateClassModal } from '../../CreateClassModal/CreateClassModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import './Header.scss';
import { JoinClasByCodeModal } from '../../JoinClassByCodeModal/JoinClassByCodeModal';
import { Notification } from '../../Notification/Notification';
import { useAppDispatch } from '../../../redux/store';
import {
  getMyInfo,
  getStudentByCodeClass,
} from '../../../redux/slice/appSlice/memberClassroomSlice';
import { Navs } from '../Navs/Navs';

export const Header = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenJoinClass, setIsOpenJoinClass] = useState(false);
  const [menu, setMenu] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const account: any = useSelector((state: RootState) => state.account.account);
  const { classroom } = useSelector((state: RootState) => state.classroom);
  const { codeclass }: { codeclass: string } = useParams();
  const { number }: { number: string } = useParams();
  const [myClassroom, setMyClassroom] = useState<any>([]);
  const [joinClassroom, setJoinClassroom] = useState<any>([]);
  const handleShow = () => setMenu(true);
  const handleClose = () => setMenu(false);
  const handleLogout = () => {
    window.localStorage.clear();
    history.push({
      pathname: `/account/login`,
    });
  };
  const getClassroom = {
    codeclass: codeclass,
    jwt: localStorage.getItem('jwt'),
  };
  const checkTeacher = async () => {
    const isTeacher = (await dispatch(getMyInfo(getClassroom))).payload;

    if (isTeacher.Permission === 'Teacher') {
      setIsTeacher(true);
    }
  };

  useEffect(() => {
    if (codeclass && codeclass != undefined) {
      checkTeacher();
      dispatch(getStudentByCodeClass(getClassroom));
    }
  }, [codeclass]);

  useEffect(() => {
    classroom.map((item: any) => {
      if(item.IDUser === account._id){
        myClassroom.push(item)
        setMyClassroom([...myClassroom]);
      }else{
        joinClassroom.push(item)
        setJoinClassroom([...joinClassroom]);
      }
    });
  },[classroom.length]);
  return (
    <div className="header">
      <CreateClassModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <JoinClasByCodeModal isOpen={isOpenJoinClass} setIsOpen={setIsOpenJoinClass} />
      <div className="header__logo">
        <div className="header__logo--btn">
          <Button variant="outline-dark" onClick={handleShow}>
            <AiOutlineMenu />
          </Button>
          <Offcanvas show={menu} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Classroom</Offcanvas.Title>
            </Offcanvas.Header>
            <div className="header__nav__body">
              <div className="header__line"></div>
              <Navs title="Giảng dạy" list={myClassroom}/>
              <div className="header__line"></div>
              <Navs title="Đã tham gia" list={joinClassroom}/>
            </div>
          </Offcanvas>
        </div>
        <Link to="/">
          <img src="/logo.jpg" alt="" />
        </Link>
      </div>
      {codeclass != undefined ? (
        <div className="header-classroom__body">
          <Link to={`/myclassroom/${codeclass}/1/antbntig`}>
            <div
              className={`header-classroom__title ${
                number == '1' ? 'header-classroom__title--select' : ''
              }`}
            >
              Bảng tin
            </div>
          </Link>
          <Link to={`/myclassroom/${codeclass}/2/omiuniguo`}>
            <div
              className={`header-classroom__title ${
                number == '2' ? 'header-classroom__title--select' : ''
              }`}
            >
              Mọi người
            </div>
          </Link>
          <Link to={`/myclassroom/${codeclass}/3/emsdoi`}>
            <div
              className={`header-classroom__title ${
                number == '3' ? 'header-classroom__title--select' : ''
              }`}
            >
              Điểm số
            </div>
          </Link>
          {isTeacher && (
            <Link to={`/myclassroom/${codeclass}/4/listreviewmark`}>
              <div
                className={`header-classroom__title ${
                  number == '4' ? 'header-classroom__title--select' : ''
                }`}
              >
                Phúc khảo
              </div>
            </Link>
          )}

          {/* <Link to={`/myclassroom/${codeclass}/4/abtipa`}>
          <div
            className={`header-classroom__title ${
              number == '4' ? 'header-classroom__title--select' : ''
            }`}
          >
            Bài tập
          </div>
        </Link> */}
        </div>
      ) : (
        <></>
      )}
      <div className="header__action">
        <div className="header__item">
          <Notification></Notification>
        </div>
        <div className="header__item">
          {/* <button className="header__item__btn" onClick={() => setIsOpen(true)}>
            <BsPlusLg size={25} />
          </button> */}
          <DropdownButton
            as={ButtonGroup}
            title={<BsPlusLg size={25} />}
            id="bg-nested-dropdown"
            variant=""
            key={'action'}
          >
            <Dropdown.Item eventKey="1" onClick={() => setIsOpenJoinClass(true)}>
              Tham gia lớp học
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setIsOpen(true)}>
              Tạo lớp học
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="header__item">
          <DropdownButton
            as={ButtonGroup}
            title={<Image src={account.Image} roundedCircle />}
            id="bg-nested-dropdown"
            variant=""
            key={'user'}
          >
            <Dropdown.Item eventKey="1">
              <Link to="/user/info">Trang cá nhân</Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <Link to="/user/password">Đổi mật khẩu</Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              <Link to="/user/mssv">Đổi mã số sinh viên</Link>
            </Dropdown.Item>
            <Dropdown.Item eventKey="4" onClick={handleLogout}>
              Đăng xuất
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
};
