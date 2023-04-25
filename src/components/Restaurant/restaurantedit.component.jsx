import "../Food/food.style.scss";
import { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateRestaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useState } from "react";
import * as Yup from "yup";

function RestaurantEdit({ data, closeModel }) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState(data.restaurantLocation);
  const [coordinates, setCoordinates] = useState({
    lat: data.latitude,
    lng: data.longitude,
  });

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const ll = await getLatLng(result[0]);
    setCoordinates(ll);
    setAddress(value);
  };

  const handleEditRestaurant = useCallback(
    (values) => {
      let restaurant = {
        restaurantId: values.restaurantId,
        restaurantLocation: address,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        restaurantName: values.restaurantName,
        restaurantNumber: values.restaurantNumber,
        status: values.status,
      };
      dispatch(updateRestaurantRequest(restaurant));
      closeModel(false);
    },
    [dispatch, closeModel, coordinates.lat, coordinates.lng, address]
  );

  const initialValues = {
    restaurantId: data.restaurantId,
    restaurantLocation: data.restaurantLocation,
    latitude: data.latitude,
    longitude: data.longitude,
    restaurantName: data.restaurantName,
    restaurantNumber: data.restaurantNumber,
    status: data.status,
    staffList: data.staffList,
  };

  const validation = Yup.object().shape({
    restaurantName: Yup.string().required("Vui lòng nhập tên nhà hàng!"),
    restaurantNumber: Yup.string()
      .min(0, "Số điện thoại không hợp lệ!")
      .max(10, "Số điện thoại không hợp lệ!")
      .required("Vui lòng nhập số điện thoại!"),
    restaurantLocation: Yup.string().required(
      "Vui lòng nhập địa chỉ nhà hàng!"
    ),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      handleEditRestaurant(values);
      resetForm({ values: "" });
    },
  });

  return (
    <div>
      <div className="popup">
        <form
          action=""
          className="form-up"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          style={{ width: "450px", height: "650px" }}
        >
          <div className="food__title unselectable">Thông tin nhà hàng</div>
          <div className="center">
            <div className="listitem">
              <label>Mã nhà hàng:</label>
              <input
                type="text"
                disabled
                id="restaurantId"
                name="restaurantId"
                value={formik.values.restaurantId}
                onChange={formik.handleChange}
              />
              <label>
                Tên nhà hàng: <span className="proirity">*</span>
              </label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={formik.values.restaurantName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.restaurantName ? (
                <div className="error__message">
                  <span>{formik.errors.restaurantName}</span>
                </div>
              ) : null}
              <label>Số điện thoại:</label>
              <input
                type="text"
                id="restaurantNumber"
                name="restaurantNumber"
                value={formik.values.restaurantNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.restaurantNumber ? (
                <div className="error__message">
                  <span>{formik.errors.restaurantNumber}</span>
                </div>
              ) : null}
              <label>
                Người quản lý: <span className="proirity">*</span>
              </label>
              <select
                id="staffList"
                name="staffList"
                value={formik.values.staffList}
                onChange={formik.handleChange}
              >
                {data.staffList &&
                  data.staffList.map((item, index) => {
                    return (
                      <option value={item.staffId}>{item.staffFullName}</option>
                    );
                  })}
              </select>
              <label>
                Địa chỉ: <span className="proirity">*</span>
              </label>
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Nhập địa chỉ ...",
                        className: "location-search-input",
                      })}
                      // name="restaurantLocation"
                      // id="restaurantLocation"
                      value={formik.values.restaurantLocation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.restaurantLocation ? (
                      <div className="error__message">
                        <span>{formik.errors.restaurantLocation}</span>
                      </div>
                    ) : null}
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: "#fafafa",
                              cursor: "pointer",
                              border: "1px solid #c4c4c4",
                            }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              {/* <label>Kinh độ:</label>
            <input
              disabled
              type="text"
              id="longitude"
              name="longitude"
              // onChange={formik.handleChange}
              value={coordinates.lng}
            />
            <label>Vĩ độ:</label>
            <input
              disabled
              type="text"
              id="latitude"
              name="latitude"
              // onChange={formik.handleChange}
              value={coordinates.lat}
            /> */}
              <label>Trạng thái: </label>
              <br></br>
              <input
                className="checkBoxStatus type"
                type="checkbox"
                id="status"
                name="status"
                value={formik.values.status}
                defaultChecked={formik.values.status}
                onChange={formik.handleChange}
              />
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
    </div>
  );
}

export default RestaurantEdit;
