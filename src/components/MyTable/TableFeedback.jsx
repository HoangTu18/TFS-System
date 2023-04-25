import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./table.scss";
import UserEdit from "../User/UserEditPopup";
import ConfirmPopup from "../Confirm/ConfirmPopup";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteStaffRequest,
  getRoleRequest,
} from "../../pages/AccountManager/AccountManageSlice";
import UserView from "../User/UserViewPopup";
const TableFeedback = (props) => {
  const dispatch = useDispatch();

  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 7;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.bodyData?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.bodyData?.length / itemsPerPage));
  }, [props.bodyData, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.bodyData?.length;
    setItemOffset(newOffset);
  };

  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [popupView, setPopupView] = useState(false);
  const [newId, setNewId] = useState("");
  const [confirm, setConfirm] = useState(false);

  // useEffect(() => {
  //   dispatch(getRoleRequest());
  // }, [dispatch]);

  const showView = (props) => {
    setNewId(props);
    setPopupView(!popupView);
  };

  return (
    <div>
      {/* {popupView ? (
        <UserView closeModel={setPopupView} data={newId} />
      ) : (
        Fragment
      )} */}
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
          {props.bodyData && props.renderBody ? (
            <>
              {currentItems &&
                currentItems.map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{item.food.foodName}</td>
                      <td>{item.rate}</td>
                      <td>
                        <Icon
                          className="icon"
                          icon="bx:show-alt"
                          onClick={() => {
                            showView(item);
                          }}
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
        pageRangeDisplayed={3}
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

export default TableFeedback;
