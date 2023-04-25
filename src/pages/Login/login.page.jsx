import React, { useCallback, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./login.style.scss";
import { useDispatch } from "react-redux";
import { loginRequest } from "./LoginManageSlice";
import { LOGGED, USER_LOGIN } from "../../ultil/settingSystem";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem(LOGGED));
    if (isLogged) {
      navigate("/dashboard/employee");
    }
  });
  const handleSubmit = useCallback(
    (values) => {
      let userLogin = {
        username: values.username,
        password: values.password,
      };
      dispatch(loginRequest({ userLogin, navigate }));
    },
    [dispatch, navigate]
  );
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="login">
      <form
        className="login__form"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <h3>Login</h3>
        <div className="input">
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <i className="fa fa-user"></i>
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <i className="fa fa-key"></i>
        </div>
        <div className="button-login">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
