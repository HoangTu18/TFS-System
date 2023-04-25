import React from "react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../NotificationConfirm/NotificationConfirm";
import "./adminpage.style.scss";
import ProfileViewPopup from "./ViewProfilePopup";
import { DOMAIN, USER_LOGIN } from "../../ultil/settingSystem";
import SettingViewPopup from "./ViewSettingPopup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRoleRequest } from "../../pages/AccountManager/AccountManageSlice";
import {
  checkedNotificationRequest,
  getNotificationRequest,
} from "./NotificationSlice";
import NotificationSound from "../../assets/notification2.mp3";
import ReactHowler from "react-howler";
import axios from "axios";

function AdminPage({ children }) {
  const navigate = useNavigate();
  const [popupProfile, setPopupProfile] = useState(false);
  const [popupSetting, setPopupSetting] = useState(false);
  const [isNotifi, setIsNotifi] = useState(false);
  const [isHaveNoti, setIsHaveNoti] = useState(false);
  const [count, setCount] = useState(1);
  const [list, setList] = useState([]);
  const [prev, setPrev] = useState(0);
  const [cur, setCur] = useState(0);

  useEffect(() => {
    setCur(list.length);
    if (prev !== list.length) {
      if (prev !== 0 || list.length === 1) {
        if (staff.theAccountForStaff.roleId === 3) {
          setIsHaveNoti(true);
          openNotification("success", "Thông Báo", "Bạn có đơn hàng mới");
        }
      }
    }

    const interval = setInterval(() => {
      fetchData();
      setCount((prevCount) => prevCount + 1);
      setPrev(list.length);
    }, 2000);

    if (staff.theAccountForStaff.roleId !== 3) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    setCount(90);
  }, []);

  const fetchData = () => {
    axios
      .get(
        `${DOMAIN}/notifications/byaccount/${staff.theAccountForStaff.accountId}`
      )
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
      });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    openNotification("success", "Thành Công", "Bạn đã thao tác thành công");
  };

  let staff = JSON.parse(localStorage.getItem(USER_LOGIN));
  let subMenuNotifi = document.getElementById("subMenuNotifi");
  const dispatch = useDispatch();
  const listRole = useSelector((state) => state.accountManage.listRole);
  const listNotification = useSelector(
    (state) => state.notificationManage.notificationList
  );

  const handleCheckedNotification = useCallback(
    (id, status, accountId) => {
      dispatch(
        checkedNotificationRequest({
          id: id,
          accountId: staff.theAccountForStaff.accountId,
        })
      );
      if (status) {
        setIsNotifi(true);
      }
    },
    [dispatch]
  );

  const handleSound = useCallback(() => {
    return <ReactHowler src={NotificationSound} playing={true} />;
  }, []);

  const handleNotification = useCallback(
    (status) => {
      const listNotifi = listNotification.filter(
        (item) => item.checked === status
      );
      if (!status) {
        return listNotifi.map((noti, index) => (
          <div
            className="sub-menu-item"
            key={noti.id}
            onClick={() => handleCheckedNotification(noti.id, noti.checked)}
          >
            <ReactHowler
              src={NotificationSound}
              onEnd={() => {
                setIsHaveNoti(false);
              }}
              playing={isHaveNoti}
            />
            {/* {isNotifi &&
              openNotification("warning", "Thông Báo", "Bạn có thông báo mới")} */}
            <p style={{ fontSize: "15px" }}>
              {noti.checked ? (
                <i className="fa-solid fa-bell-slash icon"></i>
              ) : (
                <i className="fa-regular fa-bell icon animate__animated animate__heartBeat animate__infinite"></i>
              )}
              {noti.message}
            </p>
          </div>
        ));
      } else {
        return listNotifi.map((item, index) => (
          <div className="sub-menu-item" key={item.id}>
            <p style={{ fontSize: "15px" }}>
              {item.checked ? (
                <i
                  className="fa-solid fa-bell-slash icon"
                  onClick={() =>
                    handleCheckedNotification(item.id, item.checked)
                  }
                ></i>
              ) : (
                <i
                  className="fa-regular fa-bell icon animate__animated animate__heartBeat animate__infinite"
                  onClick={() =>
                    handleCheckedNotification(item.id, item.checked)
                  }
                ></i>
              )}
              {item.message}
            </p>
          </div>
        ));
      }
    },
    [listNotification, isNotifi, handleCheckedNotification, isHaveNoti]
  );

  useEffect(() => {
    dispatch(getRoleRequest());
    if (staff.theAccountForStaff.roleId === 3) {
      dispatch(getNotificationRequest(staff.theAccountForStaff.accountId));
    }
  }, [dispatch]);

  const showProfile = () => {
    setPopupProfile(!popupProfile);
  };

  const showSetting = () => {
    setPopupSetting(!popupSetting);
  };

  const toggleMenuNotifi = () => {
    subMenuNotifi.classList.toggle("open-menu-notifi");
  };

  return (
    <div className="admin-page">
      {popupProfile ? (
        <ProfileViewPopup
          closeModel={setPopupProfile}
          data={staff}
          listRole={listRole}
        />
      ) : (
        <></>
      )}
      {popupSetting ? (
        <SettingViewPopup closeModel={setPopupSetting} data={staff} />
      ) : (
        <></>
      )}
      <div className="admin-page__header">
        <div className="admin-page__header-left">
          <h4>
            {staff.theAccountForStaff.roleId === 3
              ? staff.theRestaurant.restaurantName
              : ""}
          </h4>
        </div>
        <div className="admin-page__header-right">
          {staff.theAccountForStaff.roleId === 3 && (
            <div
              className="notification"
              onClick={() => {
                toggleMenuNotifi();
              }}
            >
              <i className="fa-solid fa-bell icon"></i>
              {staff.theAccountForStaff.roleId === 3 ? (
                <div className="counter animate__animated animate__heartBeat animate__infinite">
                  {
                    listNotification.filter((item) => item.checked === false)
                      ?.length
                  }
                </div>
              ) : (
                <div className="counter">0</div>
              )}
              <div className="sub-menu-notifi" id="subMenuNotifi">
                <div className="sub-menu">
                  <div className="sub-menu-top">
                    <div>
                      <span>Thông báo mới nhận</span>
                    </div>
                  </div>
                  <div className="sub-menu-center">
                    {listNotification.filter((item) => !item.checked).length !==
                      0 && (
                      <div className="menu-notCheck">
                        <div className="menu-notCheck-title">
                          <span>Chưa đọc</span>
                        </div>
                        <div className="menu-checked-detail">
                          {handleNotification(false)}
                        </div>
                      </div>
                    )}
                    <div className="menu-checked">
                      <div className="menu-checked-title">
                        <span>Đã đọc</span>
                      </div>
                      <div className="menu-checked-detail">
                        {handleNotification(true)}
                      </div>
                    </div>
                    <div className="sub-menu-footer">
                      <div
                        className="buttonViewAll"
                        // onClick={() => {
                        //   handleViewAllNotifi();
                        // }}
                      >
                        <p>Xem tất cả</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="dropdown">
            <div className="dropdown__select">
              <img
                style={{ marginLeft: "30px" }}
                src={
                  staff.staffAvatarUrl
                    ? staff.staffAvatarUrl
                    : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                }
                alt=""
              />
              <span className="dropdown__text unselectable">
                {staff.staffFullName.split(" ")[
                  staff.staffFullName.split(" ").length - 1
                ] +
                  " " +
                  staff.staffFullName.split(" ")[0]}
              </span>
              <i
                className="fa-sharp fa-solid fa-caret-down dropdown__caret"
                style={{ color: "black" }}
              ></i>
            </div>
            <ul className="dropdown__list">
              <li
                className="dropdown__item"
                onClick={() => {
                  showProfile();
                }}
              >
                <i className="fa-solid fa-user"></i>
                <span className="dropdown__text unselectable">
                  Thông tin cá nhân
                </span>
              </li>
              <li
                className="dropdown__item"
                onClick={() => {
                  showSetting();
                }}
              >
                <i className="fa-solid fa-gear"></i>
                <span className="dropdown__text unselectable">Cài đặt</span>
              </li>
              <li className="dropdown__item">
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className="dropdown__text unselectable" onClick={logout}>
                  Đăng xuất
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="admin-page__body">{children}</div>
    </div>
  );
}

export default AdminPage;
