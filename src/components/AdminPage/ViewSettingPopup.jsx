import { useFormik } from "formik";
import "../Food/food.style.scss";
import * as Yup from "yup";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateStaffRequest } from "../../pages/AccountManager/AccountManageSlice";
function SettingViewPopup({ closeModel, data }) {
  const dispatch = useDispatch();
  const handleUpdatePassword = useCallback(
    (values) => {
      let updatePassword = {
        staffId: values.staffId,
        staffFullName: values.staffFullName,
        staffEmail: values.staffEmail,
        staffAvatarUrl: values.staffAvatarUrl,
        staffActivityStatus: values.staffActivityStatus,
        staffStatus: values.staffStatus,
        theAccountForStaff: {
          accountId: values.accountId,
          phoneNumber: values.phoneNumber,
          password: values.password,
          roleId: values.roleId,
          status: values.status,
        },
      };
      // console.log("New ", updatePassword);
      dispatch(updateStaffRequest(updatePassword));
      closeModel(false);
    },
    [closeModel,dispatch]
  );
  const formik = useFormik({
    initialValues: {
      staffId: data.staffId,
      staffFullName: data.staffFullName,
      staffEmail: data.staffEmail,
      staffAvatarUrl: data.staffAvatarUrl,
      staffActivityStatus: data.staffActivityStatus,
      staffStatus: data.staffStatus,
      accountId: data.theAccountForStaff.accountId,
      phoneNumber: data.theAccountForStaff.phoneNumber,
      password: data.theAccountForStaff.password,
      roleId: data.theAccountForStaff.roleId,
      status: data.theAccountForStaff.status,
    },
    validationSchema: Yup.object({
      oldpassword: Yup.string()
        .oneOf([data.theAccountForStaff.password], "Mật khẩu không khớp")
        .required("Hãy nhập mật khẩu cũ"),
      password: Yup.string().required("Không được bỏ trống"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
        .required("Không được bỏ trống"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleUpdatePassword(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="popup">
      <form
        onSubmit={formik.handleSubmit}
        className="form-up"
        style={{ height: "450px", width: "400px" }}
      >
        <div className="food__title unselectable">Thay đổi mật khẩu</div>
        <div className="center">
          <div className="listitem">
            <label className="label__title">Mật khẩu cũ:</label>
            <p className="error">{formik.errors.oldpassword}</p>
            <input
              type="password"
              id="oldpassword"
              name="oldpassword"
              onChange={formik.handleChange}
            />
            <label className="label__title">Mật khẩu mới:</label>
            <p className="error">{formik.errors.password}</p>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
            />
            <label className="label__title">Nhập lại mật khẩu: </label>
            <p className="error">{formik.errors.confirm_password}</p>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              onChange={formik.handleChange}
            />
            <div className="food__button">
              <button type="submit" className="btn">
                Lưu
              </button>
              <button
                type="button"
                className="btn cancel"
                onClick={() => closeModel(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SettingViewPopup;
