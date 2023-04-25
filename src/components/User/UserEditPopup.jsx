import "../Food/food.style.scss";
import { useFormik } from "formik";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStaffRequest } from "../../pages/AccountManager/AccountManageSlice";
import { USER_LOGIN } from "../../ultil/settingSystem";
import { removeStaffFromRes } from "../../pages/RestaurantManager/RestaurantManageSlice";
import { openNotification } from "../NotificationConfirm/NotificationConfirm";
function UserEdit({ data, closeModel }) {
  const dispatch = useDispatch();
  console.log("DATA", data);
  const roleUser = JSON.parse(localStorage.getItem(USER_LOGIN))
    .theAccountForStaff.roleId;
  const listRestaurant = useSelector(
    (state) => state.restaurantManage.listRestaurant
  );
  const handleUpdateStaff = useCallback(
    (values) => {
      let staff = {
        staffActivityStatus: values.staffActivityStatus,
        staffAvatarUrl: values.staffAvatarUrl,
        staffEmail: values.staffEmail,
        staffFullName: values.staffFullName,
        staffId: values.staffId,
        staffStatus: values.staffStatus,
        theAccountForStaff: {
          accountId: values.accountId,
          password: values.password,
          phoneNumber: values.phoneNumber,
          roleId: parseInt(values.roleId),
          status: values.status,
        },
      };
      if (parseInt(values.roleId) === 3 || parseInt(values.roleId) === 4) {
        if (
          values.restaurantId !== data.theRestaurant.restaurantId ||
          data.theRestaurant === null
        ) {
          dispatch(
            removeStaffFromRes({
              staffId: values.staffId,
              staff: staff,
              roleId: values.roleId,
              restaurantId: values.restaurantId,
            })
          );
        } else {
          console.log("updated", staff);
          dispatch(updateStaffRequest(staff));
        }
      }
      closeModel(false);
    },
    [dispatch, closeModel, data.theRestaurant, data.staffActivityStatus]
  );
  const formik = useFormik({
    initialValues: {
      staffId: data.staffId,
      accountId: data.theAccountForStaff.accountId,
      password: data.theAccountForStaff.password,
      staffFullName: data.staffFullName,
      roleId: data.theAccountForStaff.roleId,
      staffEmail: data.staffEmail,
      phoneNumber: data.theAccountForStaff.phoneNumber,
      status: data.theAccountForStaff.status,
      staffActivityStatus: data.staffActivityStatus,
      staffAvatarUrl: data.staffAvatarUrl,
      staffStatus: data.staffStatus,
      restaurantId: data.theRestaurant?.restaurantId,
    },
    onSubmit: (values, { resetForm }) => {
      handleUpdateStaff(values);
      resetForm({ values: "" });
    },
  });
  const renderListRestaurant = (role) => {
    if (role === 3) {
      return (
        <select
          onChange={formik.handleChange}
          value={formik.values.restaurantId}
          id="restaurantId"
          name="restaurantId"
        >
          {listRestaurant &&
            listRestaurant.map((item, index) => {
              return (
                <option key={index} value={item.restaurantId}>
                  {item.restaurantName}
                </option>
              );
            })}
        </select>
      );
    } else if (role === 4) {
      return (
        <select
          onChange={formik.handleChange}
          value={formik.values.restaurantId}
          id="restaurantId"
          name="restaurantId"
        >
          {listRestaurant &&
            listRestaurant.map((item, index) => {
              return (
                <option key={index} value={item.restaurantId}>
                  {item.restaurantName}
                </option>
              );
            })}
        </select>
      );
    } else {
      return (
        <select disabled>
          <option>Bạn không thể chọn</option>
        </select>
      );
    }
  };
  return (
    <div className="popup">
      <form
        noValidate
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="form-up"
        style={{ height: "520px", width: "700px" }}
      >
        <div className="food__title unselectable">Điều chỉnh nhân viên</div>
        <div className="left">
          <div className="listitem">
            <label className="label__title">Tên đăng nhập:</label>
            <input
              type="text"
              id="accountId"
              name="accountId"
              value={formik.values.accountId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.accountId ? (
              <div className="error__message">
                <span>{formik.errors.accountId}</span>
              </div>
            ) : null}
            <label className="label__title">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password ? (
              <div className="error__message">
                <span>{formik.errors.password}</span>
              </div>
            ) : null}
            <label className="label__title">Họ và tên:</label>
            <input
              type="text"
              id="staffFullName"
              name="staffFullName"
              value={formik.values.staffFullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.staffFullName ? (
              <div className="error__message">
                <span>{formik.errors.staffFullName}</span>
              </div>
            ) : null}

            <label className="label__title">Chức danh:</label>
            <select
              id="roleId"
              name="roleId"
              value={formik.values.roleId}
              onChange={formik.handleChange}
            >
              <option value={2}>ADMIN</option>
              <option value={1}>OWNER</option>
              <option value={3}>MANAGER</option>
              <option value={4}>STAFF</option>
            </select>
          </div>
        </div>
        <div className="right" style={{ width: "50%" }}>
          <div className="listitem">
            <label className="label__title">Cửa hàng:</label>
            {renderListRestaurant(parseInt(formik.values.roleId))}
            <label className="label__title">Email:</label>
            <input
              type="text"
              id="staffEmail"
              name="staffEmail"
              value={formik.values.staffEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.staffEmail ? (
              <div className="error__message">
                <span>{formik.errors.staffEmail}</span>
              </div>
            ) : null}
            <label className="label__title">Số điện thoại:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phoneNumber ? (
              <div className="error__message">
                <span>{formik.errors.phoneNumber}</span>
              </div>
            ) : null}
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="staffStatus"
              name="staffStatus"
              value={formik.values.staffStatus}
              onChange={formik.handleChange}
              defaultChecked={formik.values.staffStatus}
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

export default UserEdit;
