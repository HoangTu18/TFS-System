import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import CustomerEdit from "../Customer/customeredit.component";
import { Icon } from "@iconify/react";
import "./table.scss";
import { useDispatch } from "react-redux";
import { deleteCustomerRequest } from "../../pages/CustomerManager/CustomerManageSlice";
import ConfirmPopup from "../Confirm/ConfirmPopup";
import CustomerView from "../Customer/customerViewPopup";
import { truncateString } from "../../ultil/stringUtil";
const TableCustomer = (props) => {
  const dispatch = useDispatch();

  //Handle paging
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 5;

  //Handle delete
  const [popupView, setPopupView] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [newId, setNewId] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [dataCustomer, setDataCustomer] = useState();

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.bodyData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.bodyData.length / itemsPerPage));
  }, [props.bodyData, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.bodyData.length;
    setItemOffset(newOffset);
  };
  const showView = (props) => {
    setDataCustomer(props);
    setPopupView(!popupView);
  };
  const showEdit = (props) => {
    setDataCustomer(props);
    setPopupEdit(!popupEdit);
  };
  const showDelete = (props) => {
    setNewId(props);
    setPopupDelete(!popupDelete);
  };
  if (confirm) {
    setConfirm(false);
    dispatch(deleteCustomerRequest(newId));
    setPopupDelete(!popupDelete);
  }

  const cutString = (string) => {
    let array = string.split(",");
    let length = array.length;
    return array[length - 1].trim();
  };

  return (
    <div>
      {popupView ? (
        <CustomerView closeModel={setPopupView} data={dataCustomer} />
      ) : (
        Fragment
      )}
      {popupEdit ? (
        <CustomerEdit closeModel={setPopupEdit} data={dataCustomer} />
      ) : (
        Fragment
      )}
      {popupDelete ? (
        <ConfirmPopup
          closeModel={setPopupDelete}
          title={"Bạn có muốn huỷ kích hoạt khách hàng này không?"}
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
                    <td>#{item.customerId}</td>
                    <td>
                      {item.customerName === null
                        ? "null"
                        : truncateString(item.customerName, 15)}
                    </td>
                    <td>
                      {item.theAccount === null
                        ? "null"
                        : item.theAccount.phoneNumber}
                    </td>
                    <td>
                      {item.address === null ? "null" : cutString(item.address)}
                    </td>
                    <td>{item.email === null ? "null" : item.email}</td>

                    {item.theAccount === null || !item.theAccount.status ? (
                      <td className="status red">Không hoạt động</td>
                    ) : (
                      <td className="status green">Hoạt động</td>
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
                        onClick={() => showDelete(item.customerId)}
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
        pageRangeDisplayed={5}
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

export default TableCustomer;
