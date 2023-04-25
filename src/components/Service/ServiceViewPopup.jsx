import { useFormik } from "formik";

import UploadImage from "../../ultil/UploadImage";
import "../Food/food.style.scss";

function ServiceView({ closeModel, data }) {
  const formik = useFormik({
    initialValues: {
      id: data.id,
      serviceName: data.serviceName,
      servicePrice: data.servicePrice,
      serviceDescription: data.serviceDescription,
      serviceImage: data.serviceImage,
      status: data.status,
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });
  return (
    <div className="popup">
      <form className="form-up" style={{ height: "400px" }}>
        <div className="food__title unselectable">Thông tin dịch vụ</div>
        <div className="left">
          <div className="listitem">
            <label className="label__title">
              Mã dịch vụ: <span className="proirity">*</span>
            </label>
            <input disabled type="text" value={data.id} />
            <label className="label__title">Tên dịch vụ:</label>
            <input type="text" disabled value={data.serviceName} />
            <label className="label__title">Giá (VND):</label>
            <input type="text" disabled value={data.servicePrice} />
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              disabled
              checked={data.status}
            />
          </div>
        </div>
        <div className="right">
          <div className="listitem">
            <label className="label__title">
              Mô tả: <span className="proirity">*</span>
            </label>
            <textarea type="text" disabled value={data.serviceDescription} />
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
        </div>
      </form>
    </div>
  );
}

export default ServiceView;
