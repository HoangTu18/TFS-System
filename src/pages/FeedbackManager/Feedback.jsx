import React, { Fragment, useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import { useDispatch, useSelector } from "react-redux";
import { searchByName } from "../../ultil/stringUtil";
import TableFeedback from "../../components/MyTable/TableFeedback";
import { getFeedbackRequest } from "./feedbackSlice";
function Feedback() {
  const FeedbackTableHead = ["Tên món", "Điểm đánh giá", "Hành động"];

  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => <tr key={index}></tr>;
  const dispatch = useDispatch();

  const feedbackList = useSelector(
    (state) => state.feedbackManage.listFeedback
  );
  // const restaurantId = JSON.parse(
  //   localStorage.getItem(RESTAURANT_INFO)
  // ).restaurantId;
  // const [createPopup, setCreatePopup] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    dispatch(getFeedbackRequest());
  }, [dispatch]);

  return (
    <div>
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
                <TableFeedback
                  limit="7"
                  headData={FeedbackTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={feedbackList}
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

export default Feedback;
