import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import "./table.scss";
import { truncateString } from "../../ultil/stringUtil";
import { Icon } from "@iconify/react";
import ConfirmPopup from "../Confirm/ConfirmPopup";
import { deleteCategoryRequest } from "../../pages/CategoryManager/CategoryManageSlice";
import CategoryView from "../Category/CategoryViewPopup";
import CategoryEdit from "../Category/CategoryEditPopup";

const TableCategory = (props) => {
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
    dispatch(deleteCategoryRequest(newData));
    setPopupDelete(!popupDelete);
  }
  return (
    <div>
      {popupView ? (
        <CategoryView closeModel={setPopupView} data={newData} />
      ) : (
        Fragment
      )}
      {popupEdit ? (
        <CategoryEdit closeModel={setPopupEdit} data={newData} />
      ) : (
        Fragment
      )}
      {popupDelete ? (
        <ConfirmPopup
          closeModel={setPopupDelete}
          title={"Bạn có muốn huỷ kích hoạt danh mục này không?"}
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
              {currentItems.map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td>#{item.id}</td>
                    <td>
                      {item.categoryName === null
                        ? "null"
                        : truncateString(item.categoryName, 17)}
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

export default TableCategory;
