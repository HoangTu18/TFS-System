import React from "react";
import { Link } from "react-router-dom";
import "./dashboarditem.style.scss";
function DashboardItem({ text, icon, url, isActive }) {
  return (
    <Link to={url} className={`dashboard-item ${isActive ? "active" : ""}`}>
      {icon}
      <h5>{text}</h5>
    </Link>
  );
}

export default DashboardItem;
