import React, { Fragment, useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "../../components/AdminPage/adminpage.component";
import TableOrder from "../../components/MyTable/TableOrder";
import { orderRemainingSelector } from "../../redux/selector/orderSelector";
import { RESTAURANT_INFO } from "../../ultil/settingSystem";
import { getAccountRequest } from "../AccountManager/AccountManageSlice";
import "./OrderManage.style.scss";
import { filterByStatus, getOrderRequest } from "./OrderManageSlice";
const OrderManage = () => {
  const dispatch = useDispatch();
  const listOrder = useSelector(orderRemainingSelector);
  const resId = JSON.parse(localStorage.getItem(RESTAURANT_INFO))?.restaurantId;
  const [status, setStatus] = useState("pending");
  useEffect(() => {
    dispatch(getOrderRequest(resId));
    dispatch(getAccountRequest());
  }, [dispatch, resId]);
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => <tr key={index}></tr>;
  const listStatus = [
    {
      statusIcon: "fa-solid fa-file-import",
      status: "pending",
      statusText: "Chờ xác nhận",
    },
    // {
    //   statusIcon: "fa-solid fa-credit-card",
    //   status: "waiting",
    //   statusText: "Chờ thanh toán",
    // },
    {
      statusIcon: "fa-solid fa-clipboard-check",
      status: "accept",
      statusText: "Đã xác nhận",
    },
    {
      statusIcon: "fa-solid fa-truck-fast",
      status: "delivery",
      statusText: "Đang giao hàng",
    },
    {
      statusIcon: "fa-solid fa-circle-check",
      status: "done",
      statusText: "Đã nhận hàng",
    },
    {
      statusIcon: "fa-solid fa-circle-xmark",
      status: "deny",
      statusText: "Từ chối",
    },
  ];
  const staffTableHead = [
    "Mã đơn hàng",
    "Tổng giá trị(VND)",
    "Ngày cập nhật",
    "Tình trạng đơn hàng",
    "Hành động",
  ];
  const handleFilterStatus = useCallback(
    (statusFilter) => {
      setStatus(statusFilter);
      dispatch(filterByStatus(statusFilter));
    },
    [dispatch]
  );
  return (
    <AdminPage>
      <div className="order_manage_page">
        <div className="filter_section">
          <div className="filter_section_status">
            {listStatus &&
              listStatus.map((item, index) => {
                return (
                  <div
                    className={`filter_section_status_button ${
                      item.status === status ? "isActive" : ""
                    }`}
                    key={index}
                    onClick={() => handleFilterStatus(item.status)}
                  >
                    <i className={item.statusIcon}></i>
                    <span>{item.statusText}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="table-section">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <TableOrder
                    headData={staffTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={listOrder.reverse()}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPage>
  );
};

export default OrderManage;
