import { call, put, takeLatest } from "redux-saga/effects";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  getServiceFailure,
  getServiceRequest,
  getServiceSuccess,
  insertServiceFaiture,
  insertServiceRequest,
  updateServiceFailure,
  updateServiceRequest,
  deleteServiceFailure,
  deleteServiceRequest,
} from "../../pages/ServiceManage/ServiceManageSlice";
import { serviceService } from "../../services/serviceService";
import { STATUS_CODE } from "../../ultil/settingSystem";

function* getService() {
  try {
    yield put(showLoading());
    let listService = yield call(() => {
      return serviceService.getService();
    });
    if (listService.status === STATUS_CODE.SUCCESS) {
      yield put(getServiceSuccess(listService.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getServiceFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetService() {
  yield takeLatest(getServiceRequest, getService);
}

function* insertService(action) {
  try {
    yield put(showLoading());
    let listService = yield call(() => {
      return serviceService.insertService(action.payload);
    });
    if (listService.status === STATUS_CODE.SUCCESS) {
      yield put(getServiceRequest());
      openNotification(
        "success",
        "Thành Công",
        "Thao tác của bạn đã thành công"
      );
    }
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    yield put(insertServiceFaiture());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActioninsertServices() {
  yield takeLatest(insertServiceRequest, insertService);
}

function* updateService(action) {
  try {
    yield put(showLoading());
    let listService = yield call(() => {
      return serviceService.updateService(action.payload);
    });
    if (listService.status === STATUS_CODE.SUCCESS) {
      yield put(getServiceRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(hideLoading());
    // console.log(error);
    yield put(updateServiceFailure());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionUpdateService() {
  yield takeLatest(updateServiceRequest, updateService);
}

function* deleteService(action) {
  try {
    yield put(showLoading());
    let listService = yield call(() => {
      return serviceService.deleteService(action.payload);
    });
    if (listService.status === STATUS_CODE.SUCCESS) {
      yield put(getServiceRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    // console.log(error);
    yield put(hideLoading());
    yield put(deleteServiceFailure());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionDeleteService() {
  
  yield takeLatest(deleteServiceRequest, deleteService);
}
