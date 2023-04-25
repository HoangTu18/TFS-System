import { Outlet, Navigate } from "react-router-dom";
import { LOGGED } from "../settingSystem";

const PrivateRoute = () => {
  let auth = JSON.parse(localStorage.getItem(LOGGED));
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
