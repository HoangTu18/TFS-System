import "../Food/food.style.scss";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createRestaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import * as Yup from "yup";

function RestaurantCreate({ data, closeModel }) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const ll = await getLatLng(result[0]);
    setCoordinates(ll);
    setAddress(value);
  };

  const handleCreateRestaurant = useCallback(
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
      dispatch(createRestaurantRequest(restaurant));
      closeModel(false);
    },
    [dispatch, closeModel, coordinates.lat, coordinates.lng, address]
  );

  const initialValues = {
    restaurantId: 0,
    restaurantLocation: "",
    latitude: 0,
    longitude: 0,
    restaurantName: "",
    restaurantNumber: "",
    status: true,
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
      handleCreateRestaurant(values);
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
          style={{ width: "450px", height: "550px" }}
        >
          <div className="food__title unselectable">Thông tin nhà hàng</div>
          <div className="center">
            <div className="listitem">
              <label hidden className="label__title">
                Mã nhà hàng:
              </label>
              <input
                hidden
                disabled
                type="text"
                id="restaurantId"
                name="restaurantId"
                onChange={formik.handleChange}
                values={formik.values.restaurantId}
              />
              <label className="label__title">
                Tên nhà hàng:<span className="proirity">*</span>
              </label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                onChange={formik.handleChange}
                values={formik.values.restaurantName}
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
                onChange={formik.handleChange}
                values={formik.values.restaurantNumber}
                onBlur={formik.handleBlur}
              />
              {formik.errors.restaurantNumber ? (
                <div className="error__message">
                  <span>{formik.errors.restaurantNumber}</span>
                </div>
              ) : null}
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
                      // onChange={formik.handleChange}
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
              <label>Trạng thái: </label>
              <br></br>
              <input
                className="checkBoxStatus type"
                type="checkbox"
                disabled
                id="status"
                name="status"
                onChange={formik.handleChange}
                defaultChecked={true}
                values={formik.values.status}
              />
              <div>
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default RestaurantCreate;
