import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import "./food.style.scss";
function ComboFoodView({ closeModel, data, listCate }) {
  const [listFood, setListFood] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (
      data.comboItems !== [] &&
      selected.length === 0 &&
      listFood.length === 0
    ) {
      data.comboItems.forEach((item) => {
        setSelected((prev) => [
          ...prev,
          {
            id: item.foodId,
            label: item.name,
            quantity: item.quantity,
            isChecked: true,
          },
        ]);
      });
      handleChangeCate(1);
    }
  }, []);
  const handleChangeCate = (e) => {
    let eId = e !== 1 ? +e.target.value : 1;
    setListFood([]);
    listCate.forEach((item) => {
      if (item.id === eId) {
        item.foodList.forEach((food) => {
          let data = selected.find((item) => item.id === food.id);
          let checked = false;
          let quantity = 1;
          if (data !== undefined) {
            console.log(data);
            checked = data["isChecked"];
            quantity = data["quantity"];
          }
          setListFood((prev) => [
            ...prev,
            {
              id: food.id,
              label: food.foodName,
              quantity: quantity,
              isChecked: checked,
            },
          ]);
        });
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      id: data.id,
      comboName: data.comboName,
      description: data.description,
      comboPrice: data.comboPrice,
      image: data.image,
      comboItems: [],
      status: data.status,
    },
  });
  return (
    <div className="popup">
      <form
        className="form-up"
        style={{ width: "1100px" }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className="food__title unselectable">Thông tin mâm tiệc</div>
        <div className="left">
          <div className="img__item">
            <img className="image" src={formik.values.image} alt="" />
          </div>
          <div className="listitem">
            <label className="label__title">Mã mâm tiệc:</label>
            <input disabled type="text" value={formik.values.id} />
            <label className="label__title">Tên mâm tiệc:</label>
            <input type="text" disabled value={formik.values.comboName} />
            <label className="label__title">Giá (VND):</label>
            <input type="text" disabled value={formik.values.comboPrice} />
            <label className="label__title">
              Mô tả: <span className="proirity">*</span>
            </label>
            <textarea type="text" disabled value={formik.values.description} />
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              disabled
              checked={formik.values.status}
            />
          </div>
        </div>
        <div className="right" style={{ width: "50%" }}>
          <div className="listitem" style={{ width: "450px" }}>
            <label className="label__title">Loại:</label>
            <select id="cateId" name="cateId" onChange={handleChangeCate}>
              {listCate.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.categoryName}
                  </option>
                );
              })}
            </select>
            <label className="label__title">Danh sách món ăn:</label>
            <div className="list__food">
              <ul>
                {listFood.map((item) => {
                  return (
                    <li key={item.id}>
                      <span className="title unselectable">{item.label}</span>
                      <span className="quantity unselectable">
                        Số lượng:
                        <input
                          disabled
                          type="number"
                          min={1}
                          defaultValue={item.quantity}
                        />
                      </span>
                      <input
                        type="checkbox"
                        checked={item.isChecked}
                        disabled
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <label className="label__title">Các món đã chọn:</label>
            <div className="list__food1">
              <ul>
                {selected.map((item, index) => {
                  return (
                    <li key={`${item.id}-${index}`}>
                      <span className="title unselectable">{item.label}</span>
                      <span className="quantity unselectable">
                        Số lượng: {item.quantity}
                      </span>
                      <i
                        // disabled
                        className="fa-solid fa-trash btn__remove unselectable"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="food__button">
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
export default ComboFoodView;
