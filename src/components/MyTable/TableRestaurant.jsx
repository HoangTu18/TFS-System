import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./table.scss";
import ReactPaginate from "react-paginate";
import RestaurantEdit from "../Restaurant/restaurantedit.component";
import RestaurantView from "../Restaurant/RestaurantViewPopup";
import { deleteRetaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";
import { useDispatch } from "react-redux";
import ConfirmPopup from "../Confirm/ConfirmPopup";
const TableRestaurant = (props) => {
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

  const findManager = (resId) => {
    let result = "Chưa có quản lý";
    const manager = currentItems.find(
      (item) =>
        item.restaurantId === resId &&
        item.staffList.length > 0 &&
        item.staffList.some((staff) => staff.theAccountForStaff.roleId === 3)
    );
    if (manager !== undefined) {
      result = manager.staffList.find(
        (staff) => staff.theAccountForStaff.roleId === 3
      ).staffFullName;
    }
    return result;
  };

  const [popupView, setPopupView] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [newId, setNewId] = useState("");
  const [confirm, setConfirm] = useState(false);

  const showView = (props) => {
    setNewId(props);
    setPopupView(!popupView);
  };

  const showEdit = (props) => {
    setNewId(props);
    setPopupEdit(!popupEdit);
  };
  const showDelete = (props) => {
    setNewId(props);
    setPopupDelete(!popupDelete);
  };

  if (confirm) {
    setConfirm(false);
    dispatch(deleteRetaurantRequest(newId));
    setPopupDelete(!popupDelete);
  }
  return (
    <div>
      {popupView ? (
        <RestaurantView closeModel={setPopupView} data={newId} />
      ) : (
        Fragment
      )}
      {popupEdit ? (
        <RestaurantEdit closeModel={setPopupEdit} data={newId} />
      ) : (
        Fragment
      )}
      {popupDelete ? (
        <ConfirmPopup
          closeModel={setPopupDelete}
          title={"Bạn có muốn huỷ kích hoạt nhân viên này không?"}
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
          {props.bodyData && props.renderBody ? (
            <>
              {currentItems.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>#{item.restaurantId}</td>
                    <td>{item.restaurantName}</td>
                    <td>{item.restaurantNumber}</td>
                    <td>{findManager(item.restaurantId)}</td>
                    <td>{item.restaurantLocation.split(",")[3]}</td>
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
                        icon="bx:bx-edit-alt"
                        onClick={() => {
                          showEdit(item);
                        }}
                      />
                      <Icon
                        className="icon"
                        icon="material-symbols:delete-outline-rounded"
                        onClick={() => showDelete(item.restaurantId)}
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

export default TableRestaurant;
