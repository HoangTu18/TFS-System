import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "../../components/AdminPage/adminpage.component";
import Chart from "../../components/Chart/Chart";
import Widget from "../../components/Widget/Widget";
import "./OverviewOfRes.style.scss";
// import { getRevenueBetweenRequest,  } from "./OverviewSlice";
import moment from "moment";
import { useCallback } from "react";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  getRevenueOfRes,
  getStatisticOfRes,
  getTotalUserOfResRequest,
} from "./OverviewOfResSlice";
import { RESTAURANT_INFO } from "../../ultil/settingSystem";
const OverviewOfRes = () => {
  const dispatch = useDispatch();
  const restaurantId = JSON.parse(
    localStorage.getItem(RESTAURANT_INFO)
  ).restaurantId;
  const [startDate, setStartDate] = useState(
    moment().day(-4).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const revenueByDate = useSelector(
    (state) => state.overviewOfResManage.revenue
  );
  const totalUser = useSelector((state) => state.overviewOfResManage.totalUser);
  let statistic = useSelector((state) => state.overviewOfResManage.statistic);
  useEffect(() => {
    dispatch(getStatisticOfRes(restaurantId));
    dispatch(
      getRevenueOfRes({
        fromDate: startDate,
        toDate: endDate,
        restaurantId: restaurantId,
      })
    );
    dispatch(
      getTotalUserOfResRequest({
        fromDate: startDate,
        toDate: endDate,
        restaurantId: restaurantId,
      })
    );
  }, [dispatch]);
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
        dispatch(
          getRevenueOfRes({
            fromDate: startDate,
            toDate: endDate,
            restaurantId: restaurantId,
          })
        );
      }
    },
    [dispatch, startDate, endDate, restaurantId]
  );
  return (
    <AdminPage>
      <div className="overviewContainer">
        <div className="widgets">
          <Widget
            data={totalUser.totaluser}
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
          <Chart data={revenueByDate} />
        </div>
      </div>
    </AdminPage>
  );
};

export default OverviewOfRes;
