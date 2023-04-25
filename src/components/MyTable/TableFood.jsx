import { Icon } from "@iconify/react";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodRequest } from "../../pages/FoodManager/foodManageSlice";
import { getCategoryRequest } from "../../pages/CategoryManager/CategoryManageSlice";

import ConfirmPopup from "../Confirm/ConfirmPopup";
import FoodEdit from "../Food/FoodEditPopup";
import "./table.scss";
import { truncateString } from "../../ultil/stringUtil";
import { formatToVND } from "../../ultil/numberUltil";
import FoodView from "../Food/FoodViewPopup";
import { getRegionRequest } from "../../pages/RegionManage/RegionManageSlice";
import { USER_LOGIN } from "../../ultil/settingSystem";
import FeedbackView from "../Feedback/FeedbackViewPopup";

const TableFood = (props) => {
  const dispatch = useDispatch();

  //Handle paging
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 7;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.bodyData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.bodyData.length / itemsPerPage));
  }, [props.bodyData, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.bodyData.length;
    setItemOffset(newOffset);
  };

  const [popupView, setPopupView] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [popupFeedback, setPopupFeedback] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [newData, setNewData] = useState("");

  const showView = (props) => {
    setNewData(props);
    setPopupView(!popupEdit);
  };

  const showFeedback = (props) => {
    setNewData(props);
    setPopupFeedback(!popupFeedback);
  };

  const showEdit = (props) => {
    setNewData(props);
    setPopupEdit(!popupEdit);
  };
  const showDelete = (props) => {
    setNewData(props);
    setPopupDelete(!popupDelete);
  };

  if (confirm) {
    setConfirm(false);
    dispatch(deleteFoodRequest(newData));
    setPopupDelete(!popupDelete);
  }
  const cateData = useSelector((state) => state.categoryManage.listCategory);
  const regionData = useSelector((state) => state.regionManage.listRegion);
  const role = JSON.parse(localStorage.getItem(USER_LOGIN)).theAccountForStaff
    .roleId;
  useEffect(() => {
    dispatch(getCategoryRequest());
    dispatch(getRegionRequest());
  }, [dispatch]);

  const getCateName = (food) => {
    let result = "";
    cateData.forEach((item) => {
      item.foodList.forEach((foodItem) => {
        if (foodItem.id === food.id) {
          result = item.categoryName;
        }
      });
    });
    return result;
  };

  const getCateId = (food) => {
    let result;
    const item = cateData.find((cate) =>
      cate.foodList.some((foodItem) => foodItem.id === food)
    );
    if (item) result = item.id;
    return result;
  };

  const getRegionId = (food) => {
    let result;
    const item = regionData.find((region) =>
      region.foodList.some((foodItem) => foodItem.id === food)
    );
    if (item) result = item.id;
    return result;
  };

  return (
    <div>
      {popupFeedback ? (
        <FeedbackView closeModel={setPopupFeedback} data={newData} />
      ) : (
        Fragment
      )}
      {popupView ? (
        <FoodView
          closeModel={setPopupView}
          data={newData}
          listCate={cateData}
          cateId={getCateId(newData.id)}
          listRegion={regionData}
          regionId={getRegionId(newData.id)}
        />
      ) : (
        Fragment
      )}
      {popupEdit ? (
        <FoodEdit
          closeModel={setPopupEdit}
          data={newData}
          listCate={cateData}
          cateId={getCateId(newData.id)}
          listRegion={regionData}
          regionId={getRegionId(newData.id)}
        />
      ) : (
        Fragment
      )}
      {popupDelete ? (
        <ConfirmPopup
          closeModel={setPopupDelete}
          title={"Bạn có muốn huỷ kích hoạt món ăn này không?"}
          btnYes={"Có"}
          btnNo={"Không"}
          confirm={setConfirm}
        />
      ) : (
        Fragment
      )}
      <div className="table-wrapper">
        <table>
          {props.headData && props.renderHead ? (
            <thead>
              <tr>
                {props.headData.map((item, index) =>
                  props.renderHead(item, index)
                )}
              </tr>
            </thead>
          ) : null}
          {currentItems ? (
            <>
              {currentItems.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>#{item.id}</td>
                    <td>
                      {item.foodName === null
                        ? "null"
                        : truncateString(item.foodName, 15)}
                    </td>
                    <td>
                      {item.price === null ? "null" : formatToVND(item.price)}
                    </td>
                    <td>{getCateName(item)}</td>
                    {item.status ? (
                      <td className="status green">Hoạt động</td>
                    ) : (
                      <td className="status red">Không hoạt động</td>
                    )}
                    <td>
                      <Icon
                        className="icon"
                        icon="bx:show-alt"
                        onClick={() => {
                          showView(item);
                        }}
                      />
                      <Icon
                        className="icon"
                        icon="ic:outline-feedback"
                        onClick={() => {
                          showFeedback(item);
                        }}
                      />

                      {role !== 3 ? (
                        <>
                          <Icon
                            className="icon"
                            icon="bx:bx-edit-alt"
                            onClick={() => {
                              showEdit(item);
                            }}
                          />
                          <Icon
                            className="icon"
                            icon="material-symbols:delete-outline-rounded"
                            onClick={() => showDelete(item.id)}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
            </>
          ) : null}
        </table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </div>
  );
};

export default TableFood;
