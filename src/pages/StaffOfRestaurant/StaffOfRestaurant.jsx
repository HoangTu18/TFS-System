import React, { Fragment, useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import TableStaff from "../../components/MyTable/TableStaff";
import UserCreate from "../../components/User/UserCreatePopup";
import { useDispatch, useSelector } from "react-redux";
import { searchByName } from "../../ultil/stringUtil";
import { RESTAURANT_INFO, USER_LOGIN } from "../../ultil/settingSystem";
import { getStaffOfResRequest } from "./StaffOfRestaurantSlice";
import TableListStaffOfRes from "../../components/MyTable/TableListStaffOfRes";
function StaffOfRestaurant() {
  const staffTableHead = [
    "Mã nhân viên",
    "Tên nhân viên",
    "Chức danh",
    "Số điện thoại",
    // "Hoạt động",
    "Hành động",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => <tr key={index}></tr>;
  const dispatch = useDispatch();
  const staffList = useSelector(
    (state) => state.staffOfResManage.listStaffOfRes
  )?.staffList;
  const restaurantId = JSON.parse(
    localStorage.getItem(RESTAURANT_INFO)
  ).restaurantId;
  const [createPopup, setCreatePopup] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    dispatch(getStaffOfResRequest(restaurantId));
  }, [dispatch, restaurantId]);

  return (
    <div>
      {createPopup ? <UserCreate closeModel={setCreatePopup} /> : Fragment}
      <AdminPage>
        <div className="toptable">
          <h1 style={{ marginLeft: "30px" }}>Danh sách nhân viên nhà hàng</h1>
          <div className="topnav__right">
            <div className="topnav__right-item">
              <div className="topnav__search">
                <input
                  type="text"
                  placeholder="nhập tên nhân viên để tìm..."
                  onChange={(e) => setQuery(e.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <div className="topnav__right-item"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <TableListStaffOfRes
                  limit="5"
                  headData={staffTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={searchByName(staffList, query, "staffFullName")}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              </div>
            </div>
          </div>
        </div>
      </AdminPage>
    </div>
  );
}

export default StaffOfRestaurant;
