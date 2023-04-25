import React from "react";
import { formatToVND } from "../../ultil/numberUltil";
import "./Widget.style.scss";
const Widget = ({ data, title, icon }) => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{title.toUpperCase()}</span>
        <span className="counter">{formatToVND(data)}</span>
      </div>
      <div className="right">
        <i className={`${icon} icon`}></i>
      </div>
    </div>
  );
};

export default Widget;
