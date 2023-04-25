import React, { Fragment, useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import UserCreate from "../../components/User/UserCreatePopup";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRequest } from "./CategoryManageSlice";
import { searchByName } from "../../ultil/stringUtil";
import TableCategory from "../../components/MyTable/TableCategory";
import CategoryAdd from "../../components/Category/CategoryAddPopup";
function CategoryManager() {
  const TableHead = ["Mã loại", "Tên loại", "Trạng thái", "Hành động"];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => <tr key={index}></tr>;
  const dispatch = useDispatch();
  const categoryList = useSelector(
    (state) => state.categoryManage.listCategory
  );

  const [createPopup, setCreatePopup] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    dispatch(getCategoryRequest());
  }, [dispatch]);

  return (
    <div>
      {createPopup ? <CategoryAdd closeModel={setCreatePopup} /> : Fragment}
      <AdminPage>
        <div className="toptable">
          <h1 style={{ marginLeft: "30px" }}>Danh sách danh mục món ăn</h1>
          <div className="topnav__right">
            <div className="topnav__right-item">
              <div
                className="button"
                onClick={() => setCreatePopup(!createPopup)}
              >
                Thêm danh mục +
              </div>
            </div>
            <div className="topnav__right-item">
              <div className="topnav__search">
                <input
                  type="text"
                  placeholder="nhập tên danh mục để tìm..."
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
                <TableCategory
                  limit="5"
                  headData={TableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={searchByName(categoryList, query, "categoryName")}
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

export default CategoryManager;
