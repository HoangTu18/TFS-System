import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "../../components/AdminPage/adminpage.component";
import Chart from "../../components/Chart/Chart";
import Widget from "../../components/Widget/Widget";
import "./Overview.style.scss";
import { getRevenueBetweenRequest, getStatisticRequest } from "./OverviewSlice";
import moment from "moment";
import { useCallback } from "react";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import { getRestaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";
import { getRevenueOfRes } from "../OverviewOfRes/OverviewOfResSlice";
const Overview = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    moment().day(-4).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [restaurant, setRestaurant] = useState("0");
  const listRestaurant = useSelector(
    (state) => state.restaurantManage.listRestaurant
  );
  const revenueByDate = useSelector((state) => state.statisticManage.revenue);
  const revenueByDateOwner = useSelector(
    (state) => state.overviewOfResManage.revenue
  );
  let statistic = useSelector((state) => state.statisticManage.statistic);
  useEffect(() => {
    dispatch(getStatisticRequest());
    dispatch(
      getRevenueBetweenRequest({ fromDate: startDate, toDate: endDate })
    );
    dispatch(getRestaurantRequest());
  }, []);
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const isSameDate = moment(`${startDate}`).isSame(`${endDate}`);
      const isBeforeDate = moment(`${startDate}`).isBefore(`${endDate}`);
      if (isSameDate) {
        openNotification(
          "warning",
          "Cảnh Báo",
          "Bạn đang nhập vào 2 ngày trùng nhau"
        );
      } else if (!isBeforeDate) {
        openNotification(
          "warning",
          "Cảnh Báo",
          "Bạn đang nhập vào ngày bắt đầu lớn hơn ngày kết thúc"
        );
      } else {
        if (restaurant === "0") {
          dispatch(
            getRevenueBetweenRequest({
              fromDate: startDate,
              toDate: endDate,
            })
          );
        }
        else {
          dispatch(
            getRevenueOfRes({
              fromDate: startDate,
              toDate: endDate,
              restaurantId: restaurant,
            })
          );
        }
      }
    },
    [dispatch, startDate, endDate, restaurant]
  );

  return (
    <AdminPage>
      <div className="overviewContainer">
        <div className="widgets">
          <Widget
            data={statistic.totalcustomers}
            title={"Khách hàng"}
            icon={"fa-solid fa-user"}
          />
          <Widget
            data={statistic.totalorders}
            title={"Đơn Hàng"}
            icon={"fa-solid fa-receipt"}
          />
          <Widget
            data={statistic.totalrevenues}
            title={"Doanh thu (VND)"}
            icon={"fa-solid fa-money-check-dollar"}
          />
          <Widget
            data={statistic.totalstaffs}
            title={"Nhân viên"}
            icon={"fa-solid fa-users"}
          />
        </div>
        <div className="filter-by-time">
          <form onSubmit={handleSubmit}>
            <div className="filter-item">
              <select
                id="restaurantId"
                name="restaurantId"
                onChange={(e) => setRestaurant(e.target.value)}
              >
                <option value={"0"}>Tổng doanh thu</option>
                {listRestaurant.map((item, index) => {
                  return (
                    <option key={index} value={item.restaurantId}>
                      {item.restaurantName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="filter-item">
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                max={moment().format("YYYY-MM-DD")}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="filter-item">
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                max={moment().format("YYYY-MM-DD")}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="filter-button">
              <button type="submit">Lọc</button>
            </div>
          </form>
        </div>
        <div className="chart">
          <Chart data={restaurant === "0" ? revenueByDate : revenueByDateOwner} />
        </div>
      </div>
    </AdminPage>
  );
};

export default Overview;
