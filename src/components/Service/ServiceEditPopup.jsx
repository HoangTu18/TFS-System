import { useFormik } from "formik";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateServiceRequest } from "../../pages/ServiceManage/ServiceManageSlice";
import UploadImage from "../../ultil/UploadImage";
import "../Food/food.style.scss";
import * as Yup from 'yup';

function ServiceEdit({ closeModel, data }) {
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const handleUpdateService = useCallback(
    (values) => {
      let service = {
        id: values.id,
        serviceName: values.serviceName,
        serviceImage: imageUrl === "" ? values.serviceImage : imageUrl,
        serviceDescription: values.serviceDescription,
        servicePrice: values.servicePrice,
        status: true,
      };
      console.log("SERVICE", service);
      closeModel(false);
      dispatch(updateServiceRequest(service));
    },
    [dispatch, closeModel, imageUrl]
  );

  const initialValues = {
    id: data.id,
    serviceName: data.serviceName,
    servicePrice: data.servicePrice,
    serviceDescription: data.serviceDescription,
    serviceImage: data.serviceImage,
    status: data.status,
  };

  const validation = Yup.object().shape({
    serviceName: Yup.string().required('Vui lòng nhập tên dịch vụ!'),
    servicePrice: Yup.number().required('Vui lòng nhập giá dịch vụ!').positive("Vui lòng nhập giá dịch vụ không được âm!").min(0, "Vui lòng nhập giá dịch vụ lớn hơn hoặc bằng 0!").integer("Yêu cầu số nguyên"),
    serviceDescription: Yup.string().required('Vui lòng nhập mô tả dịch vụ!'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      handleUpdateService(values);
      resetForm({ values: "" });
    },
  });

  return (
    <div className="popup">
      <form
        className="form-up"
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        style={{ height: "400px" }}
      >
        <div className="food__title unselectable">Thông tin dịch vụ</div>
        <div className="left">
          <div className="listitem">
            <label className="label__title">
              Mã dịch vụ: <span className="proirity">*</span>
            </label>
            <input
              disabled
              type="text"
              id="id"
              name="id"
              value={formik.values.id}
              onChange={formik.handleChange}
            />
            <label className="label__title">Tên dịch vụ:</label>
            <input
              type="text"
              id="serviceName"
              name="serviceName"
              value={formik.values.serviceName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.serviceName ? (
              <div className="error__message">
                <span>{formik.errors.serviceName}</span>
              </div>
            ) : null}
            <label className="label__title">Giá (VND):</label>
            <input
              type="number"
              id="servicePrice"
              name="servicePrice"
              value={formik.values.servicePrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.servicePrice ? (
              <div className="error__message">
                <span>{formik.errors.servicePrice}</span>
              </div>
            ) : null}
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              checked={formik.values.status}
            />
          </div>
        </div>
        <div className="right">
          <div className="listitem">
            <label className="label__title">
              Mô tả: <span className="proirity">*</span>
            </label>
            <textarea
              type="text"
              id="serviceDescription"
              name="serviceDescription"
              value={formik.values.serviceDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.serviceDescription ? (
              <div className="error__message">
                <span>{formik.errors.serviceDescription}</span>
              </div>
            ) : null}
            <div className="food__button">
              <button type="submit" className="btn">
                Lưu
              </button>
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

export default ServiceEdit;
