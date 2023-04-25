import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "../../components/AdminPage/adminpage.component";
import EventAdd from "../../components/Event/EventAddPopup";
import TableEvent from "../../components/MyTable/TableEvent";
import { searchByName } from "../../ultil/stringUtil";
import { getEventRequest } from "./eventManagerSlice";

function EventManager() {
  const restaurantTableHead = [
    "Mã sự kiện",
    "Tên sự kiện",
    "Các món ăn",
    "Trạng thái",
    "Thời gian",
    "Hành động",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = () => Fragment;

  const [createPopup, setCreatePopup] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.eventManage.listEvent);

  useEffect(() => {
    dispatch(getEventRequest());
    console.log(eventList);
  }, [dispatch]);

  return (
    <div>
      {createPopup ? <EventAdd closeModel={setCreatePopup} /> : <></>}

      <AdminPage>
        <div className="toptable">
          <h1 style={{ marginLeft: "30px" }}>Danh sách sự kiện</h1>
          <div className="topnav__right">
            <div className="topnav__right-item">
              <div
                className="button"
                onClick={() => setCreatePopup(!createPopup)}
              >
                Thêm sự kiện +
              </div>
            </div>
            <div className="topnav__right-item">
              <div className="topnav__search">
                <input
                  type="text"
                  placeholder="nhập tên sự kiện để tìm..."
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
                <TableEvent
                  limit="5"
                  headData={restaurantTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={eventList}
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

export default EventManager;
