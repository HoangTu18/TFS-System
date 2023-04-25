import React from "react";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashboardItem from "../../components/DashboardItem/dashboarditem.component";
import { DOMAIN, RESTAURANT_INFO, USER_LOGIN } from "../../ultil/settingSystem";
import "./dashboard.style.scss";
import axios from "axios";

function Dashboard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const role = JSON.parse(localStorage.getItem(USER_LOGIN))?.theAccountForStaff
    .roleId;
  let restaurant = JSON.parse(localStorage.getItem(RESTAURANT_INFO));
  const [checked, setChecked] = useState(
    role === 3 ? restaurant.availableStatus : false
  );

  const renderByAuth = () => {
    if (role === 2) {
      //ROLE ADMIN
      return (
        <div className="dashboard__left__items">
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "employee" ? true : false
            }
            url={"employee"}
            text={"Danh sách nhân viên"}
            icon={<i className="fa-solid fa-users"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "customer" ? true : false
            }
            url={"customer"}
            text={"Danh sách khách hàng"}
            icon={<i className="fa fa-user-friends"></i>}
          />
        </div>
      );
    } else if (role === 1) {
      // ROLE OWNER
      return (
        <div className="dashboard__left__items">
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "overview" ? true : false
            }
            url={"overview"}
            text={"Tổng quan"}
            icon={<i className="fa-solid fa-chart-simple"></i>}
          />
          <DashboardItem
            isActive={location.pathname.split("/")[2] === "food" ? true : false}
            url={"food"}
            text={"Danh sách món"}
            icon={<i className="fa-solid fa-rectangle-list"></i>}
          />

          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "restaurant" ? true : false
            }
            url={"restaurant"}
            text={"Quản lý nhà hàng"}
            icon={<i className="fa-solid fa-torii-gate"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "event" ? true : false
            }
            url={"event"}
            text={"Quản lý Sự kiện"}
            icon={<i className="fa-regular fa-calendar"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "service" ? true : false
            }
            url={"service"}
            text={"Quản lý dịch vụ"}
            icon={<i className="fa-solid fa-bell-concierge"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "promotion" ? true : false
            }
            url={"promotion"}
            text={"Quản lý mã khuyến mãi"}
            icon={<i className="fa-solid fa-ticket-simple"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "category" ? true : false
            }
            url={"category"}
            text={"Quản lý danh mục"}
            icon={<i className="fa-solid fa-list"></i>}
          />
        </div>
      );
    } else if (role === 3) {
      //ROLE MANAGER
      return (
        <div className="dashboard__left__items">
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "overviewOfRes" ? true : false
            }
            url={"overviewOfRes"}
            text={"Tổng quan"}
            icon={<i className="fa-solid fa-chart-simple"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "order" ? true : false
            }
            url={"order"}
            text={"Quản lí đơn hàng"}
            icon={<i className="fa-solid fa-receipt"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "staffOfRestaurant"
                ? true
                : false
            }
            url={"staffOfRestaurant"}
            text={"Nhân viên nhà hàng"}
            icon={<i className="fa-solid fa-users"></i>}
          />
          <DashboardItem
            isActive={
              location.pathname.split("/")[2] === "foodOfRes" ? true : false
            }
            url={"foodOfRes"}
            text={"Danh sách món"}
            icon={<i className="fa-solid fa-rectangle-list"></i>}
          />
        </div>
      );
    }
  };

  const handleSetAvailable = (res) => {
    setChecked(!checked);
    axios
      .get(`${DOMAIN}/restaurants/busybutton/${restaurant.restaurantId}`)
      .then((res) => {
        localStorage.setItem(RESTAURANT_INFO, JSON.stringify(res.data));
      })
      .catch((err) => {
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
      });
  };

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <div className="dashboard__left__logo">
          <img src="/images/logo-header.jpg" alt="" />
          <h3>Hệ thống TFS</h3>
        </div>
        {renderByAuth()}
        <div
          className="button_switch"
          style={{
            display: role === 3 ? "flex" : "none",
          }}
        >
          <p>Ngưng nhận đơn</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={!checked}
              onChange={() => handleSetAvailable()}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="dashboard__right">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
