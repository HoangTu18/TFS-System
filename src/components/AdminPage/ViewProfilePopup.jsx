import { useFormik } from "formik";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateStaffRequest } from "../../pages/AccountManager/AccountManageSlice";
import UploadImage from "../../ultil/UploadImage";
import "../Food/food.style.scss";
function ProfileViewPopup({ closeModel, data, listRole }) {
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const getRoleName = (roleId) => {
    return listRole.find((role) => role.roleId === +roleId)["roleName"];
  };
  const handleUpdateProfile = useCallback(
    (values) => {
      let updateProfile = {
        staffId: values.staffId,
        staffFullName: values.staffFullName,
        staffEmail: values.staffEmail,
        staffAvatarUrl: imageUrl || values.staffAvatarUrl,
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
      // console.log("Profile Update: ", updateProfile);
      dispatch(updateStaffRequest(updateProfile));
      closeModel(false);
    },
    [closeModel, dispatch, imageUrl]
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
    onSubmit: (values, { resetForm }) => {
      handleUpdateProfile(values);
      resetForm({ values: "" });
    },
  });

  return (
    <div className="popup ">
      <form
        onSubmit={formik.handleSubmit}
        className="form-up"
        style={{ height: "600px", width: "530px" }}
      >
        <div className="food__title unselectable">Thông tin cá nhân</div>
        <div className="left" style={{ marginLeft: "-10px" }}>
          <div className="img__item">
            <img
              className="image"
              src={imageUrl ? imageUrl : data.staffAvatarUrl}
              alt=""
            />
          </div>
          <div className="listitem">
            <label className="label__title">Họ tên:</label>
            <input
              type="text"
              id="staffFullName"
              name="staffFullName"
              value={formik.values.staffFullName}
              onChange={formik.handleChange}
            />
            <label className="label__title">Số điện thoại:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            <label className="label__title">Email:</label>
            <input
              type="text"
              id="staffEmail"
              name="staffEmail"
              value={formik.values.staffEmail}
              onChange={formik.handleChange}
            />
            <label className="label__title">Chức vụ:</label>
            <input
              type="text"
              disabled
              value={getRoleName(data.theAccountForStaff.roleId)}
            />
            <label className="label__title">Hình ảnh:</label>
            <UploadImage getImageURL={setImageUrl} />
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

export default ProfileViewPopup;
