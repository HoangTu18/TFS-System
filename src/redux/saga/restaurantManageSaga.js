import { call, put, takeLatest } from "redux-saga/effects";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import { getAccountRequest } from "../../pages/AccountManager/AccountManageSlice";
import {
  getRestaurantByStaffRequest,
  getRestaurantByStaffSuccess,
  removeStaffFromRes,
  updateRestaurantRequest,
} from "../../pages/RestaurantManager/RestaurantManageSlice";
import { deleteRetaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";
import { deleteRestaurantFailure } from "../../pages/RestaurantManager/RestaurantManageSlice";
import { updateRestaurantFailure } from "../../pages/RestaurantManager/RestaurantManageSlice";
import { createRestaurantFaiture } from "../../pages/RestaurantManager/RestaurantManageSlice";
import { createRestaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";
import {
  getRestaurantFailure,
  getRestaurantRequest,
  getRestaurantSuccess,
} from "../../pages/RestaurantManager/RestaurantManageSlice";
import { accountService } from "../../services/accountService";
import { restaurantService } from "../../services/restaurantService";
import { STATUS_CODE } from "../../ultil/settingSystem";

function* getRestaurant() {
  try {
    yield put(showLoading());
    let listRestaurant = yield call(() => {
      return restaurantService.getRestaurant();
    });
    if (listRestaurant.status === STATUS_CODE.SUCCESS) {
      yield put(getRestaurantSuccess(listRestaurant.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getRestaurantFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetRestaurant() {
  yield takeLatest(getRestaurantRequest, getRestaurant);
}
function* createRestaurant(action) {
  try {
    yield put(showLoading());
    let restaurant = yield call(() => {
      return restaurantService.createRestaurant(action.payload);
    });
    if (restaurant.status === STATUS_CODE.SUCCESS) {
      yield put(getRestaurantRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(createRestaurantFaiture(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionCreateRestaurant() {
  yield takeLatest(createRestaurantRequest, createRestaurant);
}
function* updateRestaurant(action) {
  try {
    yield put(showLoading());
    let restaurant = yield call(() => {
      return restaurantService.updateRestaurant(action.payload);
    });
    if (restaurant.status === STATUS_CODE.SUCCESS) {
      yield put(getRestaurantRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(updateRestaurantFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionUpdateRestaurant() {
  yield takeLatest(updateRestaurantRequest, updateRestaurant);
}
function* deleteRestaurant(action) {
  try {
    yield put(showLoading());
    let restaurant = yield call(() => {
      return restaurantService.deleteRestaurant(action.payload);
    });
    if (restaurant.status === STATUS_CODE.SUCCESS) {
      yield put(getRestaurantRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(deleteRestaurantFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionDeleteRestaurant() {
  yield takeLatest(deleteRetaurantRequest, deleteRestaurant);
}
function* getResByStaff(action) {
  try {
    yield put(showLoading());
    let restaurant = yield call(() => {
      return restaurantService.getRestaurantByStaffId(action.payload);
    });
    if (restaurant.status === STATUS_CODE.SUCCESS) {
      yield put(getRestaurantByStaffSuccess(restaurant.data));
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetRestaurantByStaff() {
  yield takeLatest(getRestaurantByStaffRequest, getResByStaff);
}
function* removeStaff(action) {
  try {
    yield put(showLoading());
    let staff = yield call(() => {
      return restaurantService.removeStaffFromRes(action.payload.staffId);
    });
    if (staff.status === STATUS_CODE.SUCCESS) {
      let staffListAdd = [];
      staffListAdd.push({ staffId: action.payload.staffId });
      let restaurant = yield call(() => {
        return restaurantService.updateRestaurant({
          restaurantId: action.payload.restaurantId,
          staffList: staffListAdd,
        });
      });
      if (restaurant.status === STATUS_CODE.SUCCESS) {
        let staff = yield call(() => {
          return accountService.updateStaff(action.payload.staff);
        });
        if (staff.status === STATUS_CODE.SUCCESS) {
          yield put(getAccountRequest());
          yield put(getRestaurantRequest());
        }
      }
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionRemoveStaffFromRes() {
  yield takeLatest(removeStaffFromRes, removeStaff);
}
