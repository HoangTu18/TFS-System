import { call, put, takeLatest } from "redux-saga/effects";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  loginFailute,
  loginRequest,
  loginSuccess,
} from "../../pages/Login/LoginManageSlice";
import { filterByStatus } from "../../pages/OrderManage/OrderManageSlice";
import { getRestaurantByStaffSuccess } from "../../pages/RestaurantManager/RestaurantManageSlice";
import { loginService } from "../../services/loginService";
import { restaurantService } from "../../services/restaurantService";
import {
  LOGGED,
  RESTAURANT_INFO,
  STATUS_CODE,
  USER_LOGIN,
} from "../../ultil/settingSystem";

function* login(action) {
  yield put(showLoading());
  try {
    let infoLogin = yield call(() => {
      return loginService.login(action.payload.userLogin);
    });
    if (infoLogin.status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(USER_LOGIN, JSON.stringify(infoLogin.data));
      localStorage.setItem(LOGGED, JSON.stringify(true));
      yield put(loginSuccess(infoLogin.data));
      if (parseInt(infoLogin?.data.theAccountForStaff.roleId) === 2) {
        action.payload.navigate("/dashboard/employee");
      } else if (parseInt(infoLogin?.data.theAccountForStaff.roleId) === 1) {
        action.payload.navigate("/dashboard/overview");
      } else if (parseInt(infoLogin?.data.theAccountForStaff.roleId) === 3) {
        let restaurant = yield call(() => {
          return restaurantService.getRestaurantByStaffId(
            infoLogin.data.theAccountForStaff.accountId
          );
        });
        yield put(filterByStatus("pending"));
        if (restaurant.status === STATUS_CODE.SUCCESS) {
          yield put(getRestaurantByStaffSuccess(restaurant.data));
          localStorage.setItem(
            RESTAURANT_INFO,
            JSON.stringify(restaurant.data)
          );
          action.payload.navigate("/dashboard/overviewOfRes");
        }
      }
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Bạn đã đăng nhập thành công");
  } catch (error) {
    yield put(loginFailute(error));
    openNotification(
      "error",
      "Thất Bại",
      "Bạn vui lòng kiểm tra lại tài khoản hoặc mật khẩu"
    );
    yield put(hideLoading());
  }
}
export function* followActionLogin() {
  yield takeLatest(loginRequest, login);
}
