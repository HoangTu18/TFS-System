import { call, put, takeLatest } from "redux-saga/effects";

import {
  getFeedbackRequest,
  getFeedbackSuccess,
  getFeedbackFailure,
} from "../../pages/FeedbackManager/feedbackSlice";

import { feedbackService } from "../../services/feedbackService";
import { STATUS_CODE } from "../../ultil/settingSystem";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";

function* getFeedbackList() {
  try {
    yield put(showLoading());
    let listFeedback = yield call(() => {
      return feedbackService.getFeedback();
    });
    if (listFeedback.status === STATUS_CODE.SUCCESS) {
      yield put(getFeedbackSuccess(listFeedback.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getFeedbackFailure(error));
    yield put(hideLoading());
    // openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetFeedbackList() {
  yield takeLatest(getFeedbackRequest, getFeedbackList);
}
