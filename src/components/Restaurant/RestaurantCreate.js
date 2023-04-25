import "../User/useredit.style.scss";
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
  // console.log(address);
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
      console.log(restaurant);
      dispatch(createRestaurantRequest(restaurant));
      closeModel(false);
    },
    [dispatch, closeModel, coordinates.lat, coordinates.lng, address]
  );

  const validation = Yup.object().shape({
    restaurantName: Yup.string().required("Vui lòng nhập tên nhà hàng!"),
    restaurantNumber: Yup.string()
      .min(0, "Số điện thoại không hợp lệ!")
      .max(10, "Số điện thoại không hợp lệ!")
      .required("Vui lòng nhập số điện thoại!"),
  });

  const formik = useFormik({
    initialValues: {
      restaurantId: 0,
      restaurantLocation: "",
      latitude: 0,
      longitude: 0,
      restaurantName: "",
      restaurantNumber: "",
      status: true,
    },
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      handleCreateRestaurant(values);
      resetForm({ values: "" });
    },
  });

  return (
    <div className="modelBackground">
      <div className="form-popup" style={{ marginTop: "200px" }}>
        <form
          action=""
          className="form-container"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          {/* <div className="left">
            <img
              className="avatar"
              src={
                "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
              }
              alt=""
            />
          </div> */}
          <div className="right restaurant">
            <label hidden>Mã nhà hàng:</label>
            <input
              hidden
              disabled
              type="text"
              id="restaurantId"
              name="restaurantId"
              onChange={formik.handleChange}
              values={formik.values.restaurantId}
            />
            <label>
              Tên nhà hàng: <span className="proirity">*</span>
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
                      // required: true,
                    })}
                    // name="restaurantLocation"
                    // id="restaurantLocation"
                    // value={formik.values.restaurantLocation}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                  />
                  {!address ? (
                    <div className="error__message">
                      <span>Bắt buộc</span>
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
              disabled
              id="status"
              name="status"
              onChange={formik.handleChange}
              defaultChecked={true}
              values={formik.values.status}
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
        </form>
      </div>
    </div>
  );
}

export default RestaurantCreate;
