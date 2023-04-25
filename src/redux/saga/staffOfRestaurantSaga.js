import { call, put, takeLatest } from "redux-saga/effects";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  getStaffOfResFailure,
  getStaffOfResRequest,
  getStaffOfResSuccess,
} from "../../pages/StaffOfRestaurant/StaffOfRestaurantSlice";
import { restaurantService } from "../../services/restaurantService";
import { STATUS_CODE } from "../../ultil/settingSystem";

function* getStaffOfRes(action) {
  try {
    yield put(showLoading());
    let listStaff = yield call(() => {
      return restaurantService.getRestaurantById(action.payload);
    });
    if (listStaff.status === STATUS_CODE.SUCCESS) {
      yield put(getStaffOfResSuccess(listStaff.data));
    }
    yield put(hideLoading());
    // openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(getStaffOfResFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetStaffOfRes() {
  yield takeLatest(getStaffOfResRequest, getStaffOfRes);
}
