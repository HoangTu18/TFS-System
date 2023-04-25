import { Navigate } from "react-router-dom";
import { USER_LOGIN } from "../settingSystem";

const PrivateOwner = ({ children }) => {
  const role = JSON.parse(localStorage.getItem(USER_LOGIN)).theAccountForStaff
    .roleId;

  if (children.type.name === "FoodManager") {
    return children;
  } else if (parseInt(role) === 2) {
    return <Navigate to="/dashboard/employee" />;
  } else if (parseInt(role) === 3) {
    return <Navigate to="/dashboard/overviewOfRes" />;
  } else {
    return children;
  }
};
export default PrivateOwner;
