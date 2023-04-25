import React, { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateCustomerRequest } from "../../pages/CustomerManager/CustomerManageSlice";
function CustomerEdit({ data, closeModel }) {
  const dispatch = useDispatch();
  const handleUdpateCustomer = useCallback(
    (values) => {
      let customer = {
        customerId: values.customerId,
        customerName: values.customerName,
        email: values.email,
        cart: values.cart,
        avatarURL: values.avatarURL,
        address: values.address,
        theAccount: {
          accountId: values.accountId,
          password: values.password,
          phoneNumber: values.phoneNumber,
          roleId: values.roleId,
          status: values.status,
        },
      };
      dispatch(updateCustomerRequest(customer));
      closeModel(false);
    },
    [dispatch, closeModel]
  );
  const formik = useFormik({
    initialValues: {
      customerId: data.customerId,
      customerName: data.customerName,
      email: data.email,
      cart: data.cart,
      avatarURL: data.avatarURL,
      address: data.address,
      accountId: data.theAccount.accountId,
      password: data.theAccount.password,
      phoneNumber: data.theAccount.phoneNumber,
      roleId: data.theAccount.roleId,
      status: data.theAccount.status,
    },
    onSubmit: (values, { resetForm }) => {
      handleUdpateCustomer(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="modelBackground">
      <div className="form-popup" style={{ top: "15%" }}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          className="form-container"
        >
          <div className="left">
            <img
              className="avatar"
              src={
                "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
            <div className="right">
              <label>Mã khách hàng:</label>
              <input
                type="text"
                disabled
                id="customerId"
                name="customerId"
                value={formik.values.customerId}
              />
              <label>Tên khách hàng:</label>
              <input
                type="text"
                disabled
                id="customerName"
                name="customerName"
                value={formik.values.customerName}
              />
              <label>Số điện thoại:</label>
              <input
                type="text"
                disabled
                id="phoneNumber"
                name="phoneNumber"
                value={data.theAccount.phoneNumber}
              />
              <label>Địa chỉ:</label>
              <input
                type="text"
                disabled
                id="address"
                name="address"
                value={formik.values.address}
              />
              <label>Email:</label>
              <input
                type="text"
                disabled
                id="email"
                name="email"
                value={formik.values.email}
              />
              <label>Trạng thái: </label>
              <br></br>
              <input
                className="checkBoxStatus type"
                type="checkbox"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                defaultChecked={formik.values.status}
              />
              <div style={{ display: "flex", float: "right" }}>
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
    </div>
  );
}

export default CustomerEdit;
