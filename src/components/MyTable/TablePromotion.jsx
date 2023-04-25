import { Icon } from "@iconify/react";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getEventRequest } from "../../pages/EventManager/eventManagerSlice.js";
import ConfirmPopup from "../Confirm/ConfirmPopup.jsx";
import "./table.scss";
import {
  deletePromotionRequest,
  getPromotionRequest,
} from "../../pages/PromotionManage/PromotionManageSlice.js";
import PromotionView from "../Promotion/PromotionViewPopup.jsx";
import PromotionUpdate from "../Promotion/PromotionUpdatePopup.jsx";

const TablePromotion = (props) => {
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
  const eventList = useSelector((state) => state.eventManage.listEvent);
  const promotionList = useSelector(
    (state) => state.promotionManage.listPromotion
  );
  const [popupView, setPopupView] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [newData, setNewData] = useState("");

  useEffect(() => {
    dispatch(getEventRequest());
    dispatch(getPromotionRequest());
  }, [dispatch]);

  const getEventName = (eventId) => {
    let data = eventList.find((item) => item.eventId === +eventId);
    if (data !== undefined) {
      return data.eventName;
    }
    return "Chưa có kèm sự kiện";
  };

  const showView = (props) => {
    setNewData(props);
    setPopupView(!popupView);
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
    console.log("a");
    setConfirm(false);
    dispatch(deletePromotionRequest(newData));
    setPopupDelete(!popupDelete);
  }

  return (
    <div>
      {popupView ? (
        <PromotionView
          closeModel={setPopupView}
          data={newData}
          listEvent={eventList}
        />
      ) : (
        Fragment
      )}
      {popupEdit ? (
        <PromotionUpdate
          closeModel={setPopupEdit}
          data={newData}
          listEvent={eventList}
          listPromo={promotionList}
        />
      ) : (
        Fragment
      )}

      {popupDelete ? (
        <ConfirmPopup
          closeModel={setPopupDelete}
          title={"Bạn có muốn huỷ kích hoạt khuyến mãi này không?"}
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
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>#{item.id}</td>
                    <td>{getEventName(item.eventId)}</td>
                    <td>{item.discountPercent}%</td>
                    <td>{item.promotionCode}</td>
                    {item.status ? (
                      <td className="status green">Hoạt động</td>
                    ) : (
                      <td className=" status red">Không hoạt động</td>
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
                    </td>
                  </tr>
                ))}
              </tbody>
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

export default TablePromotion;
