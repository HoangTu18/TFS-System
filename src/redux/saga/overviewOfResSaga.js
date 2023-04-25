import { takeLatest, put, call } from "redux-saga/effects";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  getRevenueOfRes,
  getRevenueOfResFailure,
  getRevenueOfResSuccess,
  getStatisticOfRes,
  getStatisticOfResFailure,
  getStatisticOfResSuccess,
  getTotalUserOfResRequest,
  getTotalUserOfResSuccess,
} from "../../pages/OverviewOfRes/OverviewOfResSlice";
import { statisticService } from "../../services/statisticService";
import { STATUS_CODE } from "../../ultil/settingSystem";

function* getStatistic(action) {
  try {
    yield put(showLoading());
    let statistic = yield call(() => {
      return statisticService.getStatisticOfRes(action.payload);
    });
    if (statistic.status === STATUS_CODE.SUCCESS) {
      yield put(getStatisticOfResSuccess(statistic.data));
    }
    yield put(hideLoading());
    // openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(getStatisticOfResFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActionGetStatisticOfRes() {
  yield takeLatest(getStatisticOfRes, getStatistic);
}

function* getRevenue(action) {
  try {
    yield put(showLoading());
    let revenue = yield call(() => {
      return statisticService.getRevenueOfRes(action.payload);
    });
    if (revenue.status === STATUS_CODE.SUCCESS) {
      yield put(getRevenueOfResSuccess(revenue.data));
    }
    yield put(hideLoading());
    // openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(getRevenueOfResFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetRevenueOfRes() {
  yield takeLatest(getRevenueOfRes, getRevenue);
}
function* getTotalUser(action) {
  try {
    let totalUser = yield call(() => {
      return statisticService.getUserOfRes(action.payload);
    });
    if (totalUser.status === STATUS_CODE.SUCCESS) {
      yield put(getTotalUserOfResSuccess(totalUser.data));
    }
  } catch (error) {
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetTotalUserOfRes() {
  yield takeLatest(getTotalUserOfResRequest, getTotalUser);
}
