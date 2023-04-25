import { Navigate } from "react-router-dom";
import { USER_LOGIN } from "../settingSystem";

const PrivateAdmin = ({ children }) => {
  const role = JSON.parse(localStorage.getItem(USER_LOGIN)).theAccountForStaff
    .roleId;
  if (role === 1) {
    return <Navigate to="/dashboard/food" />;
  } else if (role === 3) {
    return <Navigate to="/dashboard/order" />;
  } else {
    return children;
  }
};
export default PrivateAdmin;
