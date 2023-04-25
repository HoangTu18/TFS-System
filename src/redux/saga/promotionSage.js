import { call, put, takeLatest } from "redux-saga/effects";

import {
  getPromotionRequest,
  getPromotionSuccess,
  getPromotionFailure,
  insertPromotionRequest,
  insertPromotionFaiture,
  updatePromotionRequest,
  updatePromotionFailure,
  deletePromotionRequest,
  deletePromotionFailure,
} from "../../pages/PromotionManage/PromotionManageSlice";

import { promotionService } from "../../services/promotionService";
import { STATUS_CODE } from "../../ultil/settingSystem";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";

function* getPromotion() {
  try {
    yield put(showLoading());
    let listPromotion = yield call(() => {
      return promotionService.getPromotion();
    });
    if (listPromotion.status === STATUS_CODE.SUCCESS) {
      yield put(getPromotionSuccess(listPromotion.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getPromotionFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetPromotions() {
  yield takeLatest(getPromotionRequest, getPromotion);
}

function* insertPromotion(action) {
  try {
    yield put(showLoading());
    let listPromotion = yield call(() => {
      return promotionService.insertPromotion(action.payload);
    });
    if (listPromotion.status === STATUS_CODE.SUCCESS) {
      yield put(getPromotionRequest());
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

export function* followActioninsertPromotions() {
  yield takeLatest(insertPromotionRequest, insertPromotion);
}

function* updatePromotion(action) {
  try {
    yield put(showLoading());
    let listPromotion = yield call(() => {
      return promotionService.updatePromotion(action.payload);
    });
    if (listPromotion.status === STATUS_CODE.SUCCESS) {
      yield put(getPromotionRequest());
    }
    yield hideLoading();
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield hideLoading();
    yield put(updatePromotionFailure(action));
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionUpdatePromotion() {
  yield takeLatest(updatePromotionRequest, updatePromotion);
}

function* deletePromotion(action) {
  try {
    yield put(showLoading());
    let listPromotion = yield call(() => {
      return promotionService.deletePromotion(action.payload);
    });
    if (listPromotion.status === STATUS_CODE.SUCCESS) {
      yield put(getPromotionRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActionDeletePromotion() {
  yield takeLatest(deletePromotionRequest, deletePromotion);
}
