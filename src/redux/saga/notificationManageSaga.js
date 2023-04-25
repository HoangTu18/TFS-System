import { call, put, takeLatest } from "redux-saga/effects";
import {
  checkedNotificationRequest,
  checkedNotificationSuccess,
  getNotificationFailure,
  getNotificationRequest,
  getNotificationSuccess,
} from "../../components/AdminPage/NotificationSlice";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import { notificationService } from "../../services/notificationService";
import { STATUS_CODE } from "../../ultil/settingSystem";

function* getNotification(action) {
  try {
    let notification = yield call(() => {
      return notificationService.getNotification(action.payload);
    });
    if (notification.status === STATUS_CODE.SUCCESS) {
      yield put(getNotificationSuccess(notification.data));
    }
  } catch (error) {
    yield put(getNotificationFailure(error));
  }
}
export function* followActionGetNotification() {
  yield takeLatest(getNotificationRequest, getNotification);
}
function* checkedNotification(action) {
  try {
    let checked = yield call(() => {
      return notificationService.checkedNotification(action.payload.id);
    });
    if (checked.status === STATUS_CODE.SUCCESS) {
      yield put(checkedNotificationSuccess());
      yield put(getNotificationRequest(action.payload.accountId));
    }
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionCheckedNotification() {
  yield takeLatest(checkedNotificationRequest, checkedNotification);
}
