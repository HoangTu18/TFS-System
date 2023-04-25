import { call, put, takeLatest } from "redux-saga/effects";

import {
  getRegionRequest,
  getRegionSuccess,
  getRegionFailure,
  creatRegionRequest,
  createRegionFaiture,
  updateRegionRequest,
  updateRegionFailure,
} from "../../pages/RegionManage/RegionManageSlice";

import { regionService } from "../../services/regionService";
import { STATUS_CODE } from "../../ultil/settingSystem";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";

function* getRegion() {
  try {
    yield put(showLoading());
    let listRegion = yield call(() => {
      return regionService.getRegion();
    });
    if (listRegion.status === STATUS_CODE.SUCCESS) {
      yield put(getRegionSuccess(listRegion.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getRegionFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetRegions() {
  yield takeLatest(getRegionRequest, getRegion);
}
