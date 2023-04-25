function FoodView({
  data,
  closeModel,
  listCate,
  cateId,
  listRegion,
  regionId,
}) {
  // console.log(data);
  return (
    <div className="modelBackground">
      <div className="form-popup">
        <div className="form-container">
          <div className="left">
            <img
              className="avatar"
              src={
                data.imgUrl
                  ? data.imgUrl
                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
          </div>
          <div className="right">
            <label>Mã món ăn:</label>
            <input type="text" disabled value={data.id} />
            <label>Tên món ăn:</label>
            <input type="text" value={data.foodName} disabled />
            <label>Giá (VND):</label>
            <input type="text" disabled value={data.price} />
            <label>Loại:</label>
            <select value={cateId} disabled>
              {listCate.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.categoryName}
                  </option>
                );
              })}
            </select>
            <label>
              Vùng/Miền: <span className="proirity">*</span>
            </label>
            <select value={regionId} disabled>
              {listRegion.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.region_name}
                  </option>
                );
              })}
            </select>
            <label>Mô tả:</label>
            <textarea type="text" disabled value={data.description} />
            <label>Trạng thái:</label>
            <br></br>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              disabled
              checked={data.status}
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
  );
}

export default FoodView;
