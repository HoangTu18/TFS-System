import "../Food/food.style.scss";
function UserView({ data, closeModel }) {
  console.log(data);
  const roleNamebyId = (id) => {
    switch (id) {
      case 1:
        return "Owner";
      case 2:
        return "Admin";
      case 3:
        return "Manager";
      case 4:
        return "Staff";
    }
  };
  return (
    <div className="popup">
      <form className="form-up" style={{ height: "620px", width: "400px" }}>
        <div className="food__title unselectable">Thông tin nhân viên</div>
        <div className="center">
          <div className="listitem">
            {/* <label className="label__title">Mã nhân viên:</label>
            <input type="text" value={data.staffId} /> */}
            <label className="label__title">Tên đăng nhập:</label>
            <input
              disabled
              type="text"
              defaultValue={data.theAccountForStaff.accountId}
            />

            <label className="label__title"> Họ và tên:</label>
            <input disabled type="text" defaultValue={data.staffFullName} />

            <label className="label__title">Chức danh:</label>
            <input
              disabled
              type="text"
              defaultValue={roleNamebyId(data.theAccountForStaff.roleId)}
            />

            <label className="label__title">Email:</label>
            <input disabled type="text" defaultValue={data.staffEmail} />

            <label className="label__title">Số điện thoại:</label>
            <input
              disabled
              type="text"
              defaultValue={data.theAccountForStaff.phoneNumber}
            />

            <label className="label__title">Trạng thái:</label>
            <input
              disabled
              className="checkBoxStatus type"
              type="checkbox"
              defaultChecked={data.staffStatus}
            />

            <div className="food__button">
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

export default UserView;
