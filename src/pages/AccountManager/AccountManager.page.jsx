import React, { Fragment, useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import TableStaff from "../../components/MyTable/TableStaff";
import UserCreate from "../../components/User/UserCreatePopup";
import { useDispatch, useSelector } from "react-redux";
import { getAccountRequest } from "./AccountManageSlice";
import { searchByName } from "../../ultil/stringUtil";
import { USER_LOGIN } from "../../ultil/settingSystem";
import { getRestaurantRequest } from "../RestaurantManager/RestaurantManageSlice";
function AccountManager() {
  const staffTableHead = [
    "Mã nhân viên",
    "Tên nhân viên",
    "Chức danh",
    "Chi nhánh",
    "Trạng thái",
    "Số điện thoại",
    "Hành động",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => <tr key={index}></tr>;
  const dispatch = useDispatch();
  const staffList = useSelector((state) => state.accountManage.listAccount);

  const [createPopup, setCreatePopup] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    dispatch(getAccountRequest());
  }, [dispatch]);

  return (
    <div>
      {createPopup ? <UserCreate closeModel={setCreatePopup} /> : Fragment}
      <AdminPage>
        <div className="toptable">
          <h1 style={{ marginLeft: "30px" }}>Danh sách nhân viên</h1>
          <div className="topnav__right">
            <div className="topnav__right-item">
              <div
                className="button"
                onClick={() => setCreatePopup(!createPopup)}
              >
                Thêm nhân viên +
              </div>
            </div>
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
                <TableStaff
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

export default AccountManager;
