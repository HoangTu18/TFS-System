import { useFormik } from "formik";
import "../Food/food.style.scss";

function CategoryView({ closeModel, data }) {
  const formik = useFormik({
    initialValues: {
      id: data.id,
      categoryName: data.categoryName,
      foodList: [],
      status: data.status,
    },
  });
  return (
    <div className="popup">
      <form
        noValidate
        autoComplete="off"
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
              disabled
              id="categoryName"
              value={formik.values.categoryName}
              onChange={formik.handleChange}
            />
            <label className="label__title">Trạng thái:</label>
            <input
              className="checkBoxStatus type"
              type="checkbox"
              id="status"
              name="status"
              disabled
              value={formik.values.status}
              checked={formik.values.status}
              onChange={formik.handleChange}
            />
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
      </form>
    </div>
  );
}

export default CategoryView;
