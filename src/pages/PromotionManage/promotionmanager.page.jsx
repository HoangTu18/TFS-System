import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "../../components/AdminPage/adminpage.component";
import TablePromotion from "../../components/MyTable/TablePromotion";
import { searchByName } from "../../ultil/stringUtil";
import { getPromotionRequest } from "./PromotionManageSlice";
import PromotionAdd from "../../components/Promotion/PromotionAddPopup";
import { getEventRequest } from "../EventManager/eventManagerSlice";

function PromotionManager() {
  const promotionTableHead = [
    "Mã khuyến mãi",
    "Tên khuyến mãi",
    "% khuyến mãi",
    "Code khuyến mãi",
    "Trạng thái",
    "Hành động",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = () => <></>;

  const [createPopup, setCreatePopup] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const promotionList = useSelector(
    (state) => state.promotionManage.listPromotion
  );
  const eventList = useSelector((state) => state.eventManage.listEvent);

  useEffect(() => {
    dispatch(getPromotionRequest());
    dispatch(getEventRequest());
  }, [dispatch]);

  return (
    <div>
      {createPopup ? (
        <PromotionAdd
          closeModel={setCreatePopup}
          listPromo={promotionList}
          listEvent={eventList}
        />
      ) : (
        <></>
      )}
      <AdminPage>
        <div className="toptable">
          <h1 style={{ marginLeft: "30px" }}>Danh sách các khuyến mãi</h1>
          <div className="topnav__right">
            <div className="topnav__right-item">
              <div
                className="button"
                onClick={() => setCreatePopup(!createPopup)}
              >
                Thêm mã khuyến mãi +
              </div>
            </div>
            <div className="topnav__right-item">
              <div className="topnav__search">
                <input
                  type="text"
                  placeholder="nhập Mã code để tìm..."
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
                <TablePromotion
                  limit="7"
                  headData={promotionTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={searchByName(promotionList, query, "promotionCode")}
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

export default PromotionManager;
