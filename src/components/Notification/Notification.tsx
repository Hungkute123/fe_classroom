import React, { useState, useEffect } from 'react';
import './Notification.scss';
import { IoIosNotificationsOutline } from 'react-icons/io';
import io from 'socket.io-client';
import { RootState } from '../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  connectNotification,
  getNotification,
  sendNotification,
} from '../../redux/slice/appSlice/notificationSlice';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { getInfo } from '../../redux/slice/appSlice/accountSlice';
interface INotification {
  _id: string;
  NotificationType: string;
  CreateDate: string;
  Read: boolean;
  RecipientID: string;
  SenderID: string;
  Message: string;
  ClassName: string;
  Url: string;
}
let socket: any;
export const Notification = () => {
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [isAll, setIsAll] = useState(true);
  const { account } = useSelector((state: RootState) => state.account);
  const [isConnect, setIsConnect] = useState(false);
  //const { socket, notification } = useSelector((state: RootState) => state.notification);
  const [dataNotification, setDataNotification] = useState<INotification[]>([]);
  const [countNotificaton, setCountNotification] = useState(0);
  const [dataFilter, setDataFilter] = useState<INotification[]>([]);
  const handleOnEnter = () => {
    setShowOptions(true);
  };

  const handleOnLeave = () => {
    setShowOptions(false);
  };
  const handleChangeIsAll = (e: any) => {
    setIsAll(e);
  };
  useEffect(() => {
    setCountNotification(0);
    setDataFilter([]);
    dataNotification.map((item) => {
      if (item.Read === false) {
        setCountNotification(countNotificaton + 1);
        dataFilter.push(item);
        setDataFilter([...dataFilter]);
      }
    });
  }, [dataNotification.length]);
  useEffect(() => {
    handleConnectSocket();
  }, []);

  useEffect(() => {
    if (isConnect) {
      socket.on('dataNotification', (data: any) => {
        data.data.map((item: any) => {
          dataNotification.push(item);
          setDataNotification([...dataNotification]);
        });
        console.log(data);
      });
      socket.on('newDataNotification', (data: any) => {
        data.data.map((item: any) => {
          dataNotification.push(item);
          setDataNotification([...dataNotification]);
          toast.info('Bạn có một thông báo mới!', {
            position: 'bottom-left',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
        console.log(data);
      });
    }
    // const action = getNotification({});
    // dispatch(action);
    // console.log(notification);
    // setDataNotification([...notification]);
  }, [isConnect]);

  const handleConnectSocket = async () => {
    const data = (await dispatch(getInfo({ jwt: localStorage.getItem('jwt') }))).payload;
    const ENDPOINT = String(process.env.URL_MY_SOCKET);
    socket = io(ENDPOINT, { transports: ['websocket'] });
    socket.on('connect', () => {
      console.log(socket.id);
    });
    console.log(socket);
    setIsConnect(true);
    socket.emit('getNotification', { _id: data._id });
  };
  const handleUpdateNotification = (item: any, index: number) => {
    console.log('haha');
    console.log(item, index);
    if (item.Read === false) {
      const notification = {
        Read: true,
      };
      const key = {
        _id: item._id,
      };
      socket.emit('updateNotification', {
        notification: notification,
        key: key,
      });
      dataNotification[index].Read = true;
      console.log(dataNotification[index].Read);
      setDataNotification([...dataNotification]);
    }
  };
  return (
    <div className="notification" onMouseEnter={handleOnEnter} onMouseLeave={handleOnLeave}>
      <div className="notification__label">
        <IoIosNotificationsOutline size={30} />
      </div>
      {countNotificaton === 0 ? (
        <></>
      ) : (
        <span className="notify notify-right">{countNotificaton}</span>
      )}
      <div className={`notification__block ${showOptions ? 'notification__block--show' : ''}`}>
        <div className="notification__list">
          <div className="notification__header">
            <div className="notification__header__title">Thông báo</div>
            <div className="notification__header__filter">
              {isAll === true ? (
                <>
                  <div
                    className="notification__header__btn notification__header__btn__current"
                    onClick={(e) => handleChangeIsAll(true)}
                  >
                    <div className="notification__header__switch notification__header__switch__current">
                      Tất cả
                    </div>
                  </div>
                  <div
                    className="notification__header__btn"
                    onClick={(e) => handleChangeIsAll(false)}
                  >
                    <div className="notification__header__switch">Chưa đọc</div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="notification__header__btn"
                    onClick={(e) => handleChangeIsAll(true)}
                  >
                    <div className="notification__header__switch">Tất cả</div>
                  </div>
                  <div
                    className="notification__header__btn notification__header__btn__current"
                    onClick={(e) => handleChangeIsAll(false)}
                  >
                    <div className="notification__header__switch notification__header__switch__current">
                      Chưa đọc
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="notification__body">
            {dataNotification.length === 0 ? (
              <div className="notification__body__empty">Bạn chưa có thông báo nào</div>
            ) : (
              dataNotification.map((item: any, index: number) => {
                return isAll === true ? (
                  <Link
                    to={`${item.Url}`}
                    onClick={(e) => handleUpdateNotification(item, index)}
                    key={index}
                  >
                    <div
                      className={`notification__body__container ${
                        item.Read ? '' : 'notification__body__container__new'
                      }  `}
                    >
                      <div className="notification__body__container__image">
                        <img src={item.info[0].Image}></img>
                        <div className="notification__body__container__content">
                          <div className="notification__body__container__content__header">
                            <div className="notification__body__container__content__title">
                              {item.info[0].Name}
                            </div>
                            <span className="notification__body__container__content__time">
                              {moment(item.CreateDate).format('hh:mm:ss DD/MM/YYYY')}
                            </span>
                          </div>
                          <div className="notification__body__container__content__body">
                            <div className="notification__body__container__content__body__title">
                              <span>{item.Message} </span>
                              {item.ClassName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : item.Read === false ? (
                  <Link
                    to={`${item.Url}`}
                    onClick={(e) => handleUpdateNotification(item, index)}
                    key={index}
                  >
                    <div
                      className={`notification__body__container ${
                        item.Read ? '' : 'notification__body__container__new'
                      }  `}
                    >
                      <div className="notification__body__container__image">
                        <img src={item.info[0].Image}></img>
                        <div className="notification__body__container__content">
                          <div className="notification__body__container__content__header">
                            <div className="notification__body__container__content__title">
                              {item.info[0].Name}
                            </div>
                            <span className="notification__body__container__content__time">
                              {moment(item.CreateDate).format('hh:mm:ss DD/MM/YYYY')}
                            </span>
                          </div>
                          <div className="notification__body__container__content__body">
                            <div className="notification__body__container__content__body__title">
                              <span>{item.Message} </span>
                              {item.ClassName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div key={index}></div>
                );
              })
            )}
          </div>

          {/* <div className="notification__all">
            <a onClick={(e) => handleSendNotification(e)}>Xem Tất Cả Thông Báo</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};
