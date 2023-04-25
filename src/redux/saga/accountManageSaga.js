import { call, put, takeLatest } from "redux-saga/effects";
import {
  createAccountRequest,
  deleteStaffRequest,
  getAccountFailure,
  getAccountRequest,
  getAccountSuccess,
  getRoleFailure,
  getRoleRequest,
  getRoleSuccess,
  updateStaffRequest,
} from "../../pages/AccountManager/AccountManageSlice";
import { accountService } from "../../services/accountService";
import { STATUS_CODE, USER_LOGIN } from "../../ultil/settingSystem";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { restaurantService } from "../../services/restaurantService";
import { getRestaurantRequest } from "../../pages/RestaurantManager/RestaurantManageSlice";

function* getAccount() {
  try {
    yield put(showLoading());
    let listAccount = yield call(() => {
      return accountService.getStaff();
    });
    if (listAccount.status === STATUS_CODE.SUCCESS) {
      yield put(getAccountSuccess(listAccount.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getAccountFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActiongetAccount() {
  yield takeLatest(getAccountRequest, getAccount);
}

function* getRole() {
  try {
    let listRole = yield call(() => {
      return accountService.getRole();
    });
    if (listRole.status === STATUS_CODE.SUCCESS) {
      yield put(getRoleSuccess(listRole.data));
    }
  } catch (error) {
    yield put(getRoleFailure(error));
  }
}
export function* followActionGetRole() {
  yield takeLatest(getRoleRequest, getRole);
}
function* createStaff(action) {
  try {
    yield put(showLoading());
    let staff = yield call(() => {
      return accountService.createStaff(action.payload.staff);
    });
    if (staff.status === STATUS_CODE.SUCCESS) {
      if (
        parseInt(action.payload.roleId) === 3 ||
        parseInt(action.payload.roleId) === 4
      ) {
        let staffListAdd = [];
        staffListAdd.push({ staffId: staff.data.staffId });
        let restaurant = yield call(() => {
          return restaurantService.updateRestaurant({
            restaurantId: action.payload.restaurantId,
            staffList: staffListAdd,
          });
        });
        if (restaurant.status === STATUS_CODE.SUCCESS) {
          yield put(getRestaurantRequest());
          openNotification(
            "success",
            "Thành Công",
            "Bạn dã thêm thành công nhân viên vào cửa hàng"
          );
          yield put(getAccountRequest());
        }
      }
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log("error", error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionCreateStaff() {
  yield takeLatest(createAccountRequest, createStaff);
}
function* updateStaff(action) {
  try {
    yield put(showLoading());
    let staff = yield call(() => {
      return accountService.updateStaff(action.payload);
    });
    if (staff.status === STATUS_CODE.SUCCESS) {
      yield put(getAccountRequest());
      const currentStaff = JSON.parse(localStorage.getItem(USER_LOGIN));
      if (action.payload.staffId === currentStaff.staffId) {
        localStorage.setItem(USER_LOGIN, JSON.stringify(staff.data));
      }
    }
    yield hideLoading();
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionUpdateStaff() {
  yield takeLatest(updateStaffRequest, updateStaff);
}
function* deleteStaff(action) {
  try {
    yield put(showLoading());
    let staff = yield call(() => {
      return accountService.deleteStaff(action.payload);
    });
    if (staff.status === STATUS_CODE.SUCCESS) {
      yield put(getAccountRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionDeleteStaff() {
  yield takeLatest(deleteStaffRequest, deleteStaff);
}
