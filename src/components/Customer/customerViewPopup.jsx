import React from "react";
function CustomerView({ data, closeModel }) {
  return (
    <div className="modelBackground">
      <div className="form-popup" style={{ top: "15%" }}>
        <div className="form-container">
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
                value={data.customerId}
              />
              <label>Tên khách hàng:</label>
              <input
                type="text"
                disabled
                id="customerName"
                name="customerName"
                value={data.customerName}
              />
              <label>Số điện thoại:</label>
              <input
                type="text"
                disabled
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={data.theAccount.phoneNumber}
              />
              <label>Địa chỉ:</label>
              <input
                type="text"
                disabled
                id="address"
                name="address"
                value={data.address}
              />
              <label>Email:</label>
              <input
                type="text"
                disabled
                id="email"
                name="email"
                value={data.email}
              />
              <label>Trạng thái: </label>
              <br></br>
              <input
                className="checkBoxStatus type"
                type="checkbox"
                id="status"
                name="status"
                disabled
                Checked={data.status}
              />
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
      </div>
    </div>
  );
}

export default CustomerView;
