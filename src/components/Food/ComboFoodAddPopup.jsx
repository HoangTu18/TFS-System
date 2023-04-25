import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { insertComboFoodRequest } from "../../pages/FoodManager/foodManageSlice";
import * as Yup from "yup";
import UploadImage from "../../ultil/UploadImage";
import foodImage from "../../assets/imgs/food-page.jpg";
import "./food.style.scss";
function ComboFoodAdd({ closeModel, listCate }) {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [listFood, setListFood] = useState([]);
  const [selected, setSelected] = useState([]);
  const dataSelected = [];

  useEffect(() => {
    if (listFood.length === 0) {
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
          if (data !== undefined) {
            checked = data["isChecked"];
          }
          setListFood((prev) => [
            ...prev,
            {
              id: food.id,
              label: food.foodName,
              quantity: 1,
              isChecked: checked,
            },
          ]);
        });
      }
    });
  };

  const handleChange = (e) => {
    document.getElementById(e.target.id).disabled = !e.target.checked;
    let isChecked = e.target.checked;
    let foodId = +e.target.id;
    if (selected.length === 0) {
      if (isChecked) {
        let newData = listFood.find((item) => item.id === foodId);
        newData["isChecked"] = true;
        setSelected((prev) => [...prev, newData]);
      }
    } else if (selected.length !== 0) {
      let existingFood = selected.find((item) => item.id === foodId);
      if (isChecked) {
        if (!existingFood) {
          let newData = listFood.find((item) => item.id === foodId);
          newData["isChecked"] = true;
          setSelected((prev) => [...prev, newData]);
        }
      } else {
        //check = false, id exit
        if (existingFood) {
          let index = selected.findIndex((obj) => obj === existingFood);
          if (index > -1) {
            selected.splice(index, 1);
            setSelected((prev) => [...prev]);
            let newIndex = listFood.findIndex((item) => item.id === foodId);
            if (newIndex > -1) {
              listFood[newIndex]["isChecked"] = false;
            }
            setListFood(listFood);
          }
        }
      }
    }
  };

  const handleRemoveSelected = (itemId) => {
    let selectedCopy = [...selected];
    let index = selectedCopy.findIndex((obj) => obj.id === itemId);
    if (index > -1) {
      selectedCopy.splice(index, 1);
      setSelected(selectedCopy);
      let newIndex = listFood.findIndex((item) => item.id === itemId);
      if (newIndex > -1) {
        listFood[newIndex]["isChecked"] = false;
      }
      setListFood(listFood);
    }
  };
  const handleQuantityChange = (e) => {
    let foodId = +e.target.id;
    let quantity = +e.target.value;
    let foundIndex = selected.findIndex((obj) => obj.id === foodId);
    if (foundIndex > -1) {
      selected[foundIndex]["quantity"] = quantity;
      setSelected((prev) => [...prev]);
    }
  };

  const handleInsertFood = useCallback(
    (values) => {
      let combofood = {
        id: values.id,
        comboName: values.comboName,
        description: values.description,
        comboPrice: +values.comboPrice,
        image: imageUrl,
        comboItems: dataSelected,
        status: values.status,
      };
      console.log("COMBO FOOD", combofood);
      closeModel(false);
      dispatch(insertComboFoodRequest(combofood));
    },
    [closeModel, imageUrl, dataSelected, dispatch]
  );
  const formik = useFormik({
    initialValues: {
      id: 0,
      comboName: "",
      description: "",
      comboPrice: 0,
      image: "",
      comboItems: [],
      status: true,
    },
    validationSchema: Yup.object({
      comboName: Yup.string().required("Yêu cầu nhập tên"),
      comboPrice: Yup.number()
        .required("Yêu cầu nhập số")
        .positive("Yêu cầu số dương")
        .min(1000, "Lớn hơn hoặc bằng 1000")
        .integer("Yêu cầu số nguyên"),
      description: Yup.string().required("Mô tả không để trống"),
    }),
    onSubmit: (values, { resetForm }) => {
      selected.forEach((item) => {
        dataSelected.push({
          foodId: item.id,
          name: item.label,
          quantity: item.quantity,
        });
      });
      handleInsertFood(values);
      resetForm({ values: "" });
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
            <img className="image" src={foodImage} alt="food" />
          </div>
          <div className="listitem">
            {/* <label className="label__title">Mã combo:</label>
            <input
              disabled
              type="text"
              id="id"
              name="id"
              value={formik.values.id}
              onChange={formik.handleChange}
            /> */}
            <label className="label__title">
              Tên mâm tiệc: <span className="proirity">*</span>
              <p className="error">{formik.errors.comboName}</p>
            </label>
            <input
              type="text"
              id="comboName"
              name="comboName"
              value={formik.values.comboName}
              onChange={formik.handleChange}
              required={true}
            />
            <label className="label__title">
              Giá (VND): <span className="proirity">*</span>
              <p className="error">{formik.errors.comboPrice}</p>
            </label>
            <input
              className="price_number"
              type="number"
              id="comboPrice"
              name="comboPrice"
              min={0}
              value={formik.values.comboPrice}
              onChange={formik.handleChange}
            />
            <label className="label__title">Hình ảnh</label>
            <UploadImage getImageURL={setImageUrl} />
            <label className="label__title">
              Mô tả: <span className="proirity">*</span>
              <p className="error">{formik.errors.description}</p>
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              checked={true}
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
                          inputMode="numeric"
                          min={1}
                          max={99}
                          defaultValue={"1"}
                          id={item.id}
                          onChange={handleQuantityChange}
                        />
                      </span>
                      <input
                        type="checkbox"
                        checked={item.isChecked}
                        onClick={() =>
                          (document.getElementById(item.id).checked =
                            !item.isChecked)
                        }
                        onChange={handleChange}
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
                      <span className="quantity unselectable">
                        Số lượng: {item.quantity}
                      </span>

                      <i
                        className="fa-solid fa-trash btn__remove unselectable"
                        onClick={() => handleRemoveSelected(item.id)}
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

export default ComboFoodAdd;
