import React, { useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import { useDispatch, useSelector } from "react-redux";
import TableCustomer from "../../components/MyTable/TableCustomer";
import { getCustomerRequest } from "./CustomerManageSlice";
import { searchByPhoneNumber } from "../../ultil/stringUtil";
function CustomerManager() {
  const customerTableHead = [
    "Mã khách hàng",
    "Tên khách hàng",
    "Số điện thoại",
    "Địa chỉ",
    "Email",
    "Trạng thái",
    "Hành động",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => <tr key={index}></tr>;
  const dispatch = useDispatch();
  const listCustomer = useSelector(
    (state) => state.customerManage.listCustomer
  );
  const [query, setQuery] = useState("");
  useEffect(() => {
    dispatch(getCustomerRequest());
  }, [dispatch]);

  return (
    <div>
      <AdminPage>
        <div>
          <div className="toptable">
            <h1 style={{ marginLeft: "30px" }}>Danh sách khách hàng</h1>
            <div className="topnav__right">
              <div className="topnav__right-item">
                <div className="topnav__search">
                  <input
                    type="text"
                    placeholder="nhập sđt khách để tìm..."
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
                  <TableCustomer
                    limit="5"
                    headData={customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={searchByPhoneNumber(
                      listCustomer,
                      query,
                      "theAccount",
                      "phoneNumber"
                    )}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminPage>
    </div>
  );
}

export default CustomerManager;
