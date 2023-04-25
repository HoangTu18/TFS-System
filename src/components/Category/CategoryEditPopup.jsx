import { useFormik } from "formik";
import { useCallback } from "react";
import "../Food/food.style.scss";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { updateCategoryRequest } from "../../pages/CategoryManager/CategoryManageSlice";

function CategoryEdit({ closeModel, data }) {
  const dispatch = useDispatch();

  const handleInsertCategory = useCallback(
    (values) => {
      let category = {
        id: values.id,
        categoryName: values.categoryName,
        foodList: [],
        status: values.status,
      };
      console.log("Category Update: ", category);
      dispatch(updateCategoryRequest(category));
      closeModel(false);
    },
    [closeModel, dispatch]
  );

  const initialValues = {
    id: data.id,
    categoryName: data.categoryName,
    foodList: [],
    status: data.status,
  };

  const validation = Yup.object().shape({
    categoryName: Yup.string().required('Vui lòng nhập tên danh mục!'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      handleInsertCategory(values);
      resetForm({ values: "" });
    },
  });

  return (
    <div className="popup">
      <form
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="form-up"
        style={{ width: "500px", height: "400px" }}
      >
        <div className="food__title unselectable">Thông tin danh mục</div>
        <div className="center">
          <div className="listitem">
            <label className="label__title">
              Mã danh mục:<span className="proirity">*</span>
            </label>
            <input
              disabled
              type="text"
              id="id"
              value={formik.values.id}
              onChange={formik.handleChange}
            />
            <label className="label__title">
              Tên danh mục:<span className="proirity">*</span>
            </label>
            <input
              type="text"
              id="categoryName"
              value={formik.values.categoryName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.categoryName ? (
              <div className="error__message">
                <span>{formik.errors.categoryName}</span>
              </div>
            ) : null}
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              value={formik.values.status}
              checked={formik.values.status}
              onChange={formik.handleChange}
            />
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
      </form>
    </div>
  );
}

export default CategoryEdit;
