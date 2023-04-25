import { call, put, takeLatest } from "redux-saga/effects";

import {
  getEventRequest,
  getEventSuccess,
  getEventFailure,
  insertEventRequest,
  updateEventRequest,
  deleteEventRequest,
} from "../../pages/EventManager/eventManagerSlice";

import { eventService } from "../../services/eventService";
import { STATUS_CODE } from "../../ultil/settingSystem";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";

function* getEvent() {
  try {
    yield put(showLoading());
    let listEvent = yield call(() => {
      return eventService.getEvent();
    });
    if (listEvent.status === STATUS_CODE.SUCCESS) {
      yield put(getEventSuccess(listEvent.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getEventFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetEvents() {
  yield takeLatest(getEventRequest, getEvent);
}

function* insertEvent(action) {
  try {
    yield put(showLoading());
    let listEvent = yield call(() => {
      return eventService.insertEvent(action.payload);
    });
    if (listEvent.status === STATUS_CODE.SUCCESS) {
      yield put(getEventRequest());
      openNotification(
        "success",
        "Thành Công",
        "Thao tác của bạn đã thành công"
      );
    }
  } catch (error) {
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActioninsertEvents() {
  yield takeLatest(insertEventRequest, insertEvent);
}

function* updateEvent(action) {
  try {
    yield put(showLoading());
    let listEvent = yield call(() => {
      return eventService.updateEvent(action.payload);
    });
    if (listEvent.status === STATUS_CODE.SUCCESS) {
      yield put(getEventRequest());
    }
    yield hideLoading();
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield hideLoading();
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionUpdateEvent() {
  yield takeLatest(updateEventRequest, updateEvent);
}

function* deleteEvent(action) {
  try {
    yield put(showLoading());
    let listEvent = yield call(() => {
      return eventService.deleteEvent(action.payload);
    });
    if (listEvent.status === STATUS_CODE.SUCCESS) {
      yield put(getEventRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActionDeleteEvent() {
  yield takeLatest(deleteEventRequest, deleteEvent);
}
