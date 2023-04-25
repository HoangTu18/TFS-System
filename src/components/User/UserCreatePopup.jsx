import "../Food/food.style.scss";
import { useFormik } from "formik";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  createAccountRequest,
  getRoleRequest,
} from "../../pages/AccountManager/AccountManageSlice";
import { useEffect } from "react";
import { getRestaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";
function UserCreate({ closeModel }) {
  const dispatch = useDispatch();
  const listRole = useSelector((state) => state.accountManage.listRole);
  const listRestaurant = useSelector(
    (state) => state.restaurantManage.listRestaurant
  );

  useEffect(() => {
    dispatch(getRoleRequest());
    dispatch(getRestaurantRequest());
  }, [dispatch]);

  const handleAddStaff = useCallback(
    (values) => {
      let staff = {
        staffActivityStatus: "available",
        staffAvatarUrl: "url-test v1",
        staffEmail: values.staffEmail,
        staffFullName: values.staffFullName,
        staffStatus: true,
        theAccountForStaff: {
          accountId: values.accountId,
          password: values.password,
          phoneNumber: values.phoneNumber,
          roleId: parseInt(values.roleId),
          status: true,
        },
      };
      if (parseInt(values.roleId) === 4 || parseInt(values.roleId) === 3) {
        dispatch(
          createAccountRequest({
            staff: staff,
            roleId: values.roleId,
            restaurantId: values.restaurantId,
          })
        );
      } else {
        dispatch(
          createAccountRequest({
            staff: staff,
            roleId: values.roleId,
          })
        );
      }
      closeModel(false);
    },
    [dispatch, closeModel, listRestaurant]
  );

  const validation = Yup.object().shape({
    accountId: Yup.string().required("Vui lòng nhập tên đăng nhập!"),
    password: Yup.string()
      .min(6, "Mật khẩu ít nhất có 6 ký tự!")
      .max(14, "Mật khẩu tối đa 14 ký tự!")
      .required("Vui lòng nhập mật khẩu!"),
    staffFullName: Yup.string().required("Vui lòng nhập họ và tên!"),
    staffEmail: Yup.string()
      .email("Email không hợp lệ!")
      .required("Vui lòng nhập email!"),
    phoneNumber: Yup.string()
      .matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ!")
      .required("Vui lòng nhập số điện thoại!"),
  });

  const initialValues = {
    accountId: "",
    password: "",
    staffFullName: "",
    roleId: 3,
    staffEmail: "",
    phoneNumber: "",
    status: true,
    staffActivityStatus: "",
    staffAvatarUrl: "",
    staffStatus: true,
    restaurantId: 1,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      handleAddStaff(values);
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

  const handleChangePhoneNumber = (e) => {
    e.preventDefault();
    let flag = true;
    const { value } = e.target;
    const valueArr = value.toString().split("");
    valueArr.forEach(element => {
      if (!'0123456789'.split("").includes(element)) {
        flag = false;
        return;
      }
    })
    if (flag) {
      formik.handleChange(e);
    }
  }

  return (
    <div className="popup">
      <form
        noValidate
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="form-up"
        style={{ height: "520px", width: "700px" }}
      >
        <div className="food__title unselectable">Thêm nhân viên</div>
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
              type="text"
              id="roleId"
              name="roleId"
              value={formik.values.roleId}
              onChange={formik.handleChange}
            >
              {listRole.map((item) => {
                if (item.roleId !== 5) {
                  return (
                    <option key={item.roleId} value={item.roleId}>
                      {item.roleName}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        </div>
        <div className="right" style={{ width: "50%" }}>
          <div className="listitem">
            <label className="label__title">Cửa hàng:</label>
            {renderListRestaurant(parseInt(formik.values.roleId))}
            <label className="label__title">Email:</label>
            <input
              type="email"
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
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={handleChangePhoneNumber}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phoneNumber ? (
              <div className="error__message">
                <span>{formik.errors.phoneNumber}</span>
              </div>
            ) : null}
            <label className="label__title">Trạng thái:</label>
            <input
              disabled
              className="checkBoxStatus type"
              type="checkbox"
              defaultChecked={true}
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

export default UserCreate;
