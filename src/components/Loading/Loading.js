import React from "react";
import "./Loading.style.scss";
import { useSelector } from "react-redux";
import image from "../../assets/imgs/loading13.gif"
const Loading = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  if (isLoading) {
    return (
      <div className="bgLoading">
        <img src={image} alt="" />
      </div>
    );
  }
};

export default Loading;
