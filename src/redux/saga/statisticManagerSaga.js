import { call, put, takeLatest } from "redux-saga/effects";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  getRevenueBetweenFailure,
  getRevenueBetweenRequest,
  getRevenueBetweenSuccess,
  getStatisticFailure,
  getStatisticRequest,
  getStatisticSuccess,
} from "../../pages/Overview/OverviewSlice";
import { statisticService } from "../../services/statisticService";
import { STATUS_CODE } from "../../ultil/settingSystem";

function* getStatistic() {
  try {
    yield put(showLoading());
    let statistic = yield call(() => {
      return statisticService.getStatistic();
    });
    if (statistic.status === STATUS_CODE.SUCCESS) {
      yield put(getStatisticSuccess(statistic.data));
    }
    yield put(hideLoading());
    // openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(hideLoading());
    yield put(getStatisticFailure(error));
    openNotification("error", "Thất Bại", "Thao tác của bãn đã thất bại");
  }
}
export function* followActionGetStatistic() {
  yield takeLatest(getStatisticRequest, getStatistic);
}
function* getRevenueBetween(action) {
  try {
    yield put(showLoading());
    let revenue = yield call(() => {
      return statisticService.getRevenueBetween(action.payload);
    });
    if (revenue.status === STATUS_CODE.SUCCESS) {
      yield put(getRevenueBetweenSuccess(revenue.data));
    }
    yield put(hideLoading());
    // openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(getRevenueBetweenFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetRevenueBetween() {
  yield takeLatest(getRevenueBetweenRequest, getRevenueBetween);
}
