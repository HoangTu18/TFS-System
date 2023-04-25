import { useFormik } from "formik";
import { useEffect, useState } from "react";
import "../Food/food.style.scss";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getCategoryRequest } from "../../pages/CategoryManager/CategoryManageSlice";

function EventView({ closeModel, data }) {
  const dispatch = useDispatch();
  const listCate = useSelector((state) => state.categoryManage.listCategory);
  const [listFood, setListFood] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    dispatch(getCategoryRequest());
  }, [dispatch]);

  useEffect(() => {
    if (listFood.length === 0) {
      handleChangeCate(1);
    }
  }, []);

  useEffect(() => {
    if (
      data.foodList !== [] &&
      selected.length === 0 &&
      listFood.length === 0
    ) {
      data.foodList.forEach((item) => {
        setSelected((prev) => [
          ...prev,
          {
            id: item.id,
            label: item.foodName,
            isChecked: true,
          },
        ]);
      });
      // handleChangeCate(1);
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
          if (data !== undefined) {
            checked = data["isChecked"];
          }
          setListFood((prev) => [
            ...prev,
            {
              id: food.id,
              label: food.foodName,
              isChecked: checked,
            },
          ]);
        });
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      eventId: data.eventId,
      eventName: data.eventName,
      description: data.description,
      image_url: data.image_url,
      fromDate: data.fromDate,
      toDate: data.toDate,
      status: data.status,
      foodList: data.foodList,
    },
  });
  return (
    <div className="popup">
      <form
        className="form-up"
        style={{ width: "1100px", height: "650px" }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div className="food__title unselectable">Thông tin sự kiện</div>
        <div className="left">
          <div className="img__item">
            <img className="image" src={formik.values.image_url} alt="" />
          </div>
          <div className="listitem">
            <label className="label__title">Mã sự kiện:</label>
            <input disabled type="text" value={formik.values.eventId} />
            <label className="label__title">
              Tên sự kiện: <span className="proirity">*</span>
            </label>
            <input disabled type="text" value={formik.values.eventName} />
            <label className="label__title">
              Thời gian:<span className="proirity">*</span>
            </label>
            <input
              disabled
              type="text"
              value={moment(formik.values.fromDate).format("DD/MM/yyyy")}
            />
            <label className="label__title smallText"> Đến ngày:</label>
            <input
              disabled
              type="text"
              value={moment(formik.values.toDate).format("DD/MM/yyyy")}
            />
            <label className="label__title">Mô tả:</label>
            <textarea disabled type="text" value={formik.values.description} />
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
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
                      <input
                        type="checkbox"
                        checked={item.isChecked}
                        onClick={() =>
                          (document.getElementById(item.id).checked =
                            !item.isChecked)
                        }
                        disabled
                        id={item.id}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <label className="label__title">Các món đã chọn:</label>
            <div className="list__food1">
              <ul>
                {selected.map((item) => {
                  return (
                    <li key={item.id}>
                      <span className="title unselectable">{item.label}</span>
                      <i
                        className="fa-solid fa-trash btn__remove unselectable"
                        disabled
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="food__button">
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
  );
}

export default EventView;
