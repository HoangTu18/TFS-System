import React, { Fragment, useCallback, useEffect, useState } from "react";
import "./table.scss";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import OrderDetail from "../Order/OrderDetail";
import { getOrderByIdRequest } from "../../pages/OrderManage/OrderManageSlice";
import { formatToVND } from "../../ultil/numberUltil";
const TableOrder = (props) => {
  const dispatch = useDispatch();
  //Handle paging
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 7;

  const formatDate = (date) => {
    let stringDate = date?.slice(0, 10);
    let preDate = stringDate?.split("-", 10);
    let time = date?.slice(12, 16);
    if (preDate) {
      let formattedDate =
        preDate[2] + "/" + preDate[1] + "/" + preDate[0] + " " + time;
      return formattedDate;
    }
  };
  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "waiting":
        return "Chờ thanh toán";
      case "accept":
        return "Đã xác nhận";
      case "delivery":
        return "Đang giao hàng";
      case "done":
        return "Đã nhận hàng";
      case "deny":
        return "Từ chối";
      default:
        return "";
    }
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.bodyData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.bodyData.length / itemsPerPage));
  }, [props.bodyData, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.bodyData.length;
    setItemOffset(newOffset);
  };
  const [popupDetail, setPopupDetail] = useState(false);

  const getOrderDetail = useCallback(
    (id) => {
      setPopupDetail(!popupDetail);
      dispatch(getOrderByIdRequest(id));
    },
    [popupDetail, dispatch]
  );
  return (
    <div>
      {popupDetail ? <OrderDetail closeModel={setPopupDetail} /> : Fragment}
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
                    <td>#{item.id}</td>
                    <td>{formatToVND(item.totalPrice)}</td>
                    <td>{formatDate(item.orderDate)}</td>
                    <td>{renderStatus(item.status)}</td>
                    <td>
                      <div
                        className="detail-button"
                        onClick={() => getOrderDetail(item.id)}
                      >
                        Xem chi tiết
                      </div>
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

export default TableOrder;
