import React from "react";
import "../User/useredit.style.scss";

function DishEdit({ data, closeModel }) {
  console.log(data);
  return (
    <div className="modelBackground">
      <div className="form-popup" style={{ top: "15%" }}>
        <form action="" className="form-container">
          <div className="left">
            <img className="avatar" src={data.imgUrl} alt="" />
            <div className="right">
              <label>Mã món ăn:</label>
              <input type="text" value={data.id} readOnly />
              <label>Tên món ăn:</label>
              <input type="text" defaultValue={data.foodName} />
              <label>Giá (VND):</label>
              <input type="text" defaultValue={data.price} />
              <label>Loại:</label>
              <input type="text" defaultValue={""} />
              <label>Mô tả:</label>
              <textarea defaultValue={data.description} />
              <label>Trạng thái: </label>
              <br></br>
              <input
                className="checkBoxStatus type"
                type="checkbox"
                defaultChecked={data.status}
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

export default DishEdit;
