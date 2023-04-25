import React, { Fragment, useEffect, useState } from "react";
import "./table.scss";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { formatToVND } from "../../ultil/numberUltil";
import { Icon } from "@iconify/react";
import OrderParty from "../Order/OrderParty";
const TableOrderDetail = (props) => {
  //Handle paging
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [view, showView] = useState(false);
  const [data, setData] = useState([]);
  const itemsPerPage = 7;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.bodyData?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.bodyData?.length / itemsPerPage));
  }, [props.bodyData, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.bodyData.length;
    setItemOffset(newOffset);
  };

  const openParty = (listItem, item) => {
    showView(true);
    setData(listItem);
  };

  return (
    <>
      {view ? <OrderParty closeModel={showView} data={data} /> : <></>}
      <div style={{ border: "1px solid #c4c4c4", height: "500px" }}>
        <div className="table-wrapper" style={{ minHeight: "450px" }}>
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
                  currentItems.map((item, index) => {
                    if (item.isHeader) {
                      return (
                        <tbody key={index}>
                          <tr style={{ fontWeight: "bold" }}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{formatToVND(item.price)}</td>
                            <td>{item.quantity}</td>
                            <td>{formatToVND(item.total)}</td>
                            <td>
                              <Icon
                                className="icon"
                                icon="bx:show-alt"
                                onClick={() => {
                                  openParty(item.listParty, item);
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      );
                    }
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{formatToVND(item.price)}</td>
                          <td>{item.quantity}</td>
                          <td>{formatToVND(item.total)}</td>
                        </tr>
                      </tbody>
                    );
                  })}
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
    </>
  );
};

export default TableOrderDetail;
