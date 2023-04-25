import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { deleteComboFoodRequest } from "../../pages/FoodManager/foodManageSlice";
import { getCategoryRequest } from "../../pages/CategoryManager/CategoryManageSlice";

import ConfirmPopup from "../Confirm/ConfirmPopup";

import "./table.scss";
import { truncateString } from "../../ultil/stringUtil";
import { formatToVND } from "../../ultil/numberUltil";
import ComboFoodEdit from "../Food/ComboFoodEditPop";
import ComboFoodView from "../Food/ComboFoodViewPopup";
import { USER_LOGIN } from "../../ultil/settingSystem";

const TableComboFood = (props) => {
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
  const [confirm, setConfirm] = useState(false);
  const [newData, setNewData] = useState("");
  const role = JSON.parse(localStorage.getItem(USER_LOGIN)).theAccountForStaff
    .roleId;
  const showView = (props) => {
    setNewData(props);
    setPopupView(!popupEdit);
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
    dispatch(deleteComboFoodRequest(newData));
    setPopupDelete(!popupDelete);
  }
  const cateData = useSelector((state) => state.categoryManage.listCategory);

  useEffect(() => {
    dispatch(getCategoryRequest());
  }, [dispatch]);

  return (
    <div>
      {popupView ? (
        <ComboFoodView
          closeModel={setPopupView}
          data={newData}
          listCate={cateData}
        />
      ) : (
        <></>
      )}
      {popupEdit ? (
        <ComboFoodEdit
          closeModel={setPopupEdit}
          data={newData}
          listCate={cateData}
        />
      ) : (
        <></>
      )}
      {popupDelete ? (
        <ConfirmPopup
          closeModel={setPopupDelete}
          title={"Bạn có muốn huỷ kích hoạt combo này không?"}
          btnYes={"Có"}
          btnNo={"Không"}
          confirm={setConfirm}
        />
      ) : (
        <></>
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
                      {item.comboName === null
                        ? "null"
                        : truncateString(item.comboName, 15)}
                    </td>
                    <td>
                      {item.comboPrice === null
                        ? "null"
                        : formatToVND(item.comboPrice)}
                    </td>
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
                      {role !== 3 ? (
                        <>
                          {" "}
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

export default TableComboFood;
