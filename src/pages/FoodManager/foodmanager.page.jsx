import React, { useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import TableFood from "../../components/MyTable/TableFood";
import "./foodmanager.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getComboFoodRequest, getFoodRequest } from "./foodManageSlice";
import { getRegionRequest } from "../RegionManage/RegionManageSlice";
import FoodAdd from "../../components/Food/FoodAddPopup";
import { searchByName } from "../../ultil/stringUtil";
import TableComboFood from "../../components/MyTable/TableComboFood";
import ComboFoodAdd from "../../components/Food/ComboFoodAddPopup";
import { getCategoryRequest } from "../CategoryManager/CategoryManageSlice";
import { USER_LOGIN } from "../../ultil/settingSystem";
function FoodManager() {
  const foodTableHeadTab1 = [
    "Mã món ăn",
    "Tên món ăn",
    "Giá (VND)",
    "Loại",
    "Trạng thái",
    "Hành động",
  ];

  const foodTableHeadTab2 = [
    "Mã mâm tiệc",
    "Tên mâm tiệc",
    "Giá (VND)",
    "Trạng thái",
    "Hành động",
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => <tr key={index}></tr>;
  const [query, setQuery] = useState("");
  const [createPopup, setCreatePopup] = useState(false);
  const [createPopupCombo, setCreatePopupCombo] = useState(false);
  const dispatch = useDispatch();

  const dataFoods = useSelector((state) => state.foodManage.listFood);
  const listCate = useSelector((state) => state.categoryManage.listCategory);
  const listComboFood = useSelector((state) => state.foodManage.listComboFood);
  const listRegion = useSelector((state) => state.regionManage.listRegion);
  const role = JSON.parse(localStorage.getItem(USER_LOGIN)).theAccountForStaff
    .roleId;
  useEffect(() => {
    dispatch(getFoodRequest());
    dispatch(getRegionRequest());
    dispatch(getComboFoodRequest());
    dispatch(getCategoryRequest());
  }, [dispatch]);
  const [tab, setTab] = useState("tab1");
  return (
    <div>
      {createPopup ? (
        <FoodAdd
          closeModel={setCreatePopup}
          listCate={listCate}
          listRegion={listRegion}
        />
      ) : (
        <></>
      )}
      {createPopupCombo ? (
        <ComboFoodAdd closeModel={setCreatePopupCombo} listCate={listCate} />
      ) : (
        <></>
      )}
      <AdminPage>
        <div className="tab-wrapper">
          <div className="tab-wrapper__header">
            <span
              className={tab === "tab1" ? "active" : ""}
              onClick={() => {
                setTab("tab1");
              }}
            >
              Món lẻ
            </span>
            <span
              className={tab === "tab2" ? "active" : ""}
              onClick={() => {
                setTab("tab2");
              }}
            >
              Mâm tiệc
            </span>
          </div>
          <div className="tab__body">
            <div className={tab === "tab1" ? "tab active" : "tab"}>
              <div className="toptable">
                <h1 style={{ marginLeft: "30px" }}>Danh sách món</h1>
                <div className="topnav__right">
                  <div className="topnav__right-item">
                    {role !== 3 ? (
                      <div
                        className="button"
                        onClick={() => setCreatePopup(!createPopup)}
                      >
                        Thêm món +
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="topnav__right-item">
                    <div className="topnav__search">
                      <input
                        type="text"
                        placeholder="nhập tên món để tìm..."
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
                      <TableFood
                        limit="5"
                        headData={foodTableHeadTab1}
                        renderHead={(item, index) => renderHead(item, index)}
                        bodyData={searchByName(dataFoods, query, "foodName")}
                        renderBody={(item, index) => renderBody(item, index)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={tab === "tab2" ? "tab active" : "tab"}>
              <div className="toptable">
                <h1 style={{ marginLeft: "30px" }}>Danh sách mâm tiệc</h1>
                <div className="topnav__right">
                  <div className="topnav__right-item">
                    {role !== 3 ? (
                      <div
                        className="button"
                        onClick={() => setCreatePopupCombo(!createPopupCombo)}
                      >
                        Thêm mâm tiệc +
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="topnav__right-item">
                    <div className="topnav__search">
                      <input
                        type="text"
                        placeholder="nhập tên mâm tiệc"
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
                      <TableComboFood
                        limit="5"
                        headData={foodTableHeadTab2}
                        renderHead={(item, index) => renderHead(item, index)}
                        bodyData={searchByName(
                          listComboFood,
                          query,
                          "comboName"
                        )}
                        renderBody={(item, index) => renderBody(item, index)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminPage>
    </div>
  );
}

export default FoodManager;
