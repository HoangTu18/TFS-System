import { useFormik } from "formik";
import { useCallback, useState } from "react";
import "../Food/food.style.scss";
import { useDispatch } from "react-redux";
import { updatePromotionRequest } from "../../pages/PromotionManage/PromotionManageSlice";

function PromotionView({ closeModel, data, listEvent }) {
  const formik = useFormik({
    initialValues: {
      id: data.id,
      promotionCode: data.promotionCode,
      eventId: data.eventId !== null ? data.eventId : 1,
      discountPercent: data.discountPercent,
      status: data.status,
    },
  });
  return (
    <div className="popup">
      <form className="form-up" style={{ width: "470px", height: "650px" }}>
        <div className="food__title unselectable">Thông tin mã khuyến mãi</div>
        <div className="center">
          <div className="listitem">
            <label className="label__title">
              Mã khuyến mãi:<span className="proirity">*</span>
            </label>
            <input disabled type="text" value={formik.values.id} />
            <label className="label__title">
              Phần trăm khuyến mãi (%):<span className="proirity">*</span>
            </label>
            <input
              type="number"
              disabled
              value={formik.values.discountPercent}
            />
            <label className="label__title">
              Code khuyến mãi:<span className="proirity">*</span>
            </label>
            <input type="text" disabled value={formik.values.promotionCode} />
            <label className="label__title">
              Sự kiện đi kèm:<span className="proirity">*</span>
            </label>
            <select id="eventId" disabled value={formik.values.eventId}>
              {listEvent.map((item) => {
                return (
                  <option key={item.eventId} value={item.eventId}>
                    {item.eventName}
                  </option>
                );
              })}
            </select>
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              disabled
              checked={formik.values.status}
            />
          </div>
          <div className="food__button">
            <button
              type="button"
              className="btn cancel"
              onClick={() => closeModel(false)}
            >
              Huỷ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PromotionView;
