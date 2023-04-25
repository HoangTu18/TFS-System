import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./table.scss";
import UserEdit from "../User/UserEditPopup";
import ConfirmPopup from "../Confirm/ConfirmPopup";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";

import {
  deleteStaffRequest,
  getRoleRequest,
} from "../../pages/AccountManager/AccountManageSlice";
import UserView from "../User/UserViewPopup";
const TableStaff = (props) => {
  const dispatch = useDispatch();
  const listRole = useSelector((state) => state.accountManage.listRole);
  const restaurantList = useSelector(
    (state) => state.restaurantManage.listRestaurant
  );
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

  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [popupView, setPopupView] = useState(false);
  const [newId, setNewId] = useState("");
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    dispatch(getRoleRequest());
    dispatch(getRestaurantRequest());
  }, [dispatch]);

  const getRoleName = (id) => {
    return listRole.find((item) => item.roleId === id)["roleName"];
  };

  const getRestaurantByStaff = (staffId) => {
    const restaurant = restaurantList.find((restaurant) =>
      restaurant.staffList.some((staff) => staff.staffId === staffId)
    );
    return restaurant ? restaurant.restaurantName : "Chưa có chi nhánh";
  };

  const showEdit = (props) => {
    setNewId(props);
    setPopupEdit(!popupEdit);
  };

  const showView = (props) => {
    setNewId(props);
    setPopupView(!popupView);
  };

  const showDelete = (props) => {
    setNewId(props);
    setPopupDelete(!popupDelete);
  };

  if (confirm) {
    setConfirm(false);
    dispatch(deleteStaffRequest(newId));
    setPopupDelete(!popupDelete);
  }
  return (
    <div>
      {popupView ? (
        <UserView closeModel={setPopupView} data={newId} />
      ) : (
        Fragment
      )}
      {popupEdit ? (
        <UserEdit closeModel={setPopupEdit} data={newId} />
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
                    <td>#{item.staffId}</td>
                    <td>{item.staffFullName}</td>
                    <td>
                      {getRoleName(item.theAccountForStaff.roleId)
                        ? getRoleName(item.theAccountForStaff.roleId)
                        : " "}
                    </td>
                    <td>{getRestaurantByStaff(item.staffId)}</td>
                    {item.staffStatus ? (
                      <td className="status green">Hoạt động</td>
                    ) : (
                      <td className="status red">Không hoạt động</td>
                    )}
                    <td>{item.theAccountForStaff.phoneNumber}</td>
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
                        onClick={() => showDelete(item.staffId)}
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

export default TableStaff;
