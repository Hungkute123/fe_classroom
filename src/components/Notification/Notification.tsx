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
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [isAll, setIsAll] = useState(true);
  const { account } = useSelector((state: RootState) => state.account);
  //const { socket, notification } = useSelector((state: RootState) => state.notification);
  const [dataNotification, setDataNotification] = useState<INotification[]>([]);
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
    const ENDPOINT = String(process.env.URL_MY_SOCKET);
    socket = io(ENDPOINT, { transports: ['websocket'] });
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    console.log(socket);
    socket.emit('getNotification', { _id: account._id });
    // const action = connectNotification(account._id);
    // dispatch(action);
  }, []);

  useEffect(() => {
    socket.on('dataNotification', (data: any) => {
      data.data.map((item: any) => {
        dataNotification.push(item);
        setDataNotification([...dataNotification]);
      });
      console.log(data);
    });
    // const action = getNotification({});
    // dispatch(action);
    // console.log(notification);
    // setDataNotification([...notification]);
  }, []);

  const handleSendNotification = (event: any) => {
    event.preventDefault();
    // const action = sendNotification({notificationType: 'test',
    // createDate: Date(),
    // read: false,
    // recipientID: account._id,
    // senderID: account._id,
    // message: 'Có bài tập mới',
    // className: 'Thiết kế phần mềm',
    // url: 'sos'})
    // dispatch(action)
    socket.emit('sendNotification', {
      _id: account._id,
      notificationType: 'test',
      createDate: Date(),
      read: false,
      recipientID: account._id,
      senderID: account._id,
      message: 'Có bài tập mới',
      className: 'Thiết kế phần mềm',
      url: 'sos',
    });
  };

  return (
    <div className="notification" onMouseEnter={handleOnEnter} onMouseLeave={handleOnLeave}>
      <div className="notification__label">
        <IoIosNotificationsOutline size={30} />
      </div>
      <span className="notify notify-right">7</span>
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
            <div className="notification__body__container">
              <div className="notification__body__container__image">
                <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
                <div className="notification__body__container__content">
                  <div className="notification__body__container__content__header">
                    <div className="notification__body__container__content__title">
                      Nguyễn Hà Anh Kiểm
                    </div>
                    <span className="notification__body__container__content__time">
                      9:12 17/01/2022
                    </span>
                  </div>
                  <div className="notification__body__container__content__body">
                    <div className="notification__body__container__content__body__title">
                      Điểm mong muốn:
                      <span> 10</span>
                    </div>
                    <div className="notification__body__container__content__body__title">
                      Giải thích: <span>Cho điểm gì kỳ vậy, làm như vậy mà cho có 9,5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="notification__body__container">
              <div className="notification__body__container__image">
                <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
                <div className="notification__body__container__content">
                  <div className="notification__body__container__content__header">
                    <div className="notification__body__container__content__title">
                      Nguyễn Đình Hùng
                    </div>
                    <span className="notification__body__container__content__time">
                      9:12 17/01/2022
                    </span>
                  </div>
                  <div className="notification__body__container__content__body">
                    <div className="notification__body__container__content__body__title">
                      Điểm sau phúc khảo:
                      <span> 10</span>
                    </div>
                    <div className="notification__body__container__content__body__title">
                      Nhận xét: <span>Chấm lộn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="notification__body__container">
              <div className="notification__body__container__image">
                <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
                <div className="notification__body__container__content">
                  <div className="notification__body__container__content__header">
                    <div className="notification__body__container__content__title">
                      Nguyễn Đình Hùng
                    </div>
                    <span className="notification__body__container__content__time">
                      9:12 17/01/2022
                    </span>
                  </div>
                  <div className="notification__body__container__content__body">
                    <div className="notification__body__container__content__body__title">
                      Điểm sau phúc khảo:
                      <span> 10</span>
                    </div>
                    <div className="notification__body__container__content__body__title">
                      Nhận xét: <span>Chấm lộn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="notification__body__container">
              <div className="notification__body__container__image">
                <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
                <div className="notification__body__container__content">
                  <div className="notification__body__container__content__header">
                    <div className="notification__body__container__content__title">
                      Nguyễn Đình Hùng
                    </div>
                    <span className="notification__body__container__content__time">
                      9:12 17/01/2022
                    </span>
                  </div>
                  <div className="notification__body__container__content__body">
                    <div className="notification__body__container__content__body__title">
                      Điểm sau phúc khảo:
                      <span> 10</span>
                    </div>
                    <div className="notification__body__container__content__body__title">
                      Nhận xét: <span>Chấm lộn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="notification__body__container">
              <div className="notification__body__container__image">
                <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
                <div className="notification__body__container__content">
                  <div className="notification__body__container__content__header">
                    <div className="notification__body__container__content__title">
                      Nguyễn Đình Hùng
                    </div>
                    <span className="notification__body__container__content__time">
                      9:12 17/01/2022
                    </span>
                  </div>
                  <div className="notification__body__container__content__body">
                    <div className="notification__body__container__content__body__title">
                      Điểm sau phúc khảo:
                      <span> 10</span>
                    </div>
                    <div className="notification__body__container__content__body__title">
                      Nhận xét: <span>Chấm lộn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="notification__body__container">
              <div className="notification__body__container__image">
                <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
                <div className="notification__body__container__content">
                  <div className="notification__body__container__content__header">
                    <div className="notification__body__container__content__title">
                      Nguyễn Đình Hùng
                    </div>
                    <span className="notification__body__container__content__time">
                      9:12 17/01/2022
                    </span>
                  </div>
                  <div className="notification__body__container__content__body">
                    <div className="notification__body__container__content__body__title">
                      Điểm sau phúc khảo:
                      <span> 10</span>
                    </div>
                    <div className="notification__body__container__content__body__title">
                      Nhận xét: <span>Chấm lộn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="notification__body__container">
              <div className="notification__body__container__image">
                <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
                <div className="notification__body__container__content">
                  <div className="notification__body__container__content__header">
                    <div className="notification__body__container__content__title">
                      Nguyễn Đình Hùng
                    </div>
                    <span className="notification__body__container__content__time">
                      9:12 17/01/2022
                    </span>
                  </div>
                  <div className="notification__body__container__content__body">
                    <div className="notification__body__container__content__body__title">
                      Điểm sau phúc khảo:
                      <span> 10</span>
                    </div>
                    <div className="notification__body__container__content__body__title">
                      Nhận xét: <span>Chấm lộn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="notification__body__container">
              <div className="notification__body__container__image">
                <img src="https://lh3.googleusercontent.com/a/default-user=s40-c"></img>
                <div className="notification__body__container__content">
                  <div className="notification__body__container__content__header">
                    <div className="notification__body__container__content__title">
                      Nguyễn Đình Hùng
                    </div>
                    <span className="notification__body__container__content__time">
                      9:12 17/01/2022
                    </span>
                  </div>
                  <div className="notification__body__container__content__body">
                    <div className="notification__body__container__content__body__title">
                      Điểm sau phúc khảo:
                      <span> 10</span>
                    </div>
                    <div className="notification__body__container__content__body__title">
                      Nhận xét: <span>Chấm lộn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="notification__all">
            <a onClick={(e) => handleSendNotification(e)}>Xem Tất Cả Thông Báo</a>
          </div>
        </div>
      </div>
    </div>
  );
};
