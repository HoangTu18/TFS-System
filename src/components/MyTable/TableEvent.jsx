import { Icon } from "@iconify/react";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { deleteEventRequest } from "../../pages/EventManager/eventManagerSlice.js";
import ConfirmPopup from "../Confirm/ConfirmPopup.jsx";
import EventEdit from "../Event/EventEditPopup.jsx";
import { truncateString } from "../../ultil/stringUtil";
import "./table.scss";
import EventView from "../Event/EventViewPopup.jsx";

const TableEvent = (props) => {
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
    setConfirm(false);
    dispatch(deleteEventRequest(newData));
    setPopupDelete(!popupDelete);
  }

  return (
    <div>
      {popupView ? (
        <EventView closeModel={setPopupView} data={newData} />
      ) : (
        Fragment
      )}
      {popupEdit ? (
        <EventEdit closeModel={setPopupEdit} data={newData} />
      ) : (
        Fragment
      )}
      {popupDelete ? (
        <ConfirmPopup
          closeModel={setPopupDelete}
          title={"Bạn có muốn huỷ kích hoạt sự kiện này không?"}
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
                    <td>#{item.eventId}</td>
                    <td>{item.eventName}</td>
                    <td>
                      {item.foodList.length <= 0
                        ? "Chưa có món"
                        : item.foodList.map((item, index) => {
                            if (index >= 3) return null;
                            return truncateString(item.foodName, 7) + ", ";
                          })}
                    </td>
                    {item.status ? (
                      <td className="status green">Hoạt động</td>
                    ) : (
                      <td className="status red">Không hoạt động</td>
                    )}

                    <td>
                      {item.fromDate === null ? "" : item.fromDate.slice(5, 10)}{" "}
                      đến {item.toDate === null ? "" : item.toDate.slice(5, 10)}
                    </td>
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
                        onClick={() => showDelete(item.eventId)}
                      />
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

export default TableEvent;
