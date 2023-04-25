import { call, put, takeLatest } from "redux-saga/effects";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  getOrderByIdFailure,
  getOrderByIdRequest,
  getOrderByIdSuccess,
  getOrderFailure,
  getOrderRequest,
  getOrderSuccess,
  updateOrderFailure,
  updateOrderRequest,
  refundPaymentRequest,
} from "../../pages/OrderManage/OrderManageSlice";
import { orderService } from "../../services/orderService";
import { STATUS_CODE } from "../../ultil/settingSystem";

function* getOrder(action) {
  try {
    yield put(showLoading());
    let listOrder = yield call(() => {
      return orderService.getOrderByRestaurantId(action.payload);
    });
    if (listOrder.status === STATUS_CODE.SUCCESS) {
      yield put(getOrderSuccess(listOrder.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getOrderFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetOrder() {
  yield takeLatest(getOrderRequest, getOrder);
}
function* getOrderById(action) {
  try {
    let order = yield call(() => {
      return orderService.getOrderById(action.payload);
    });
    if (order.status === STATUS_CODE.SUCCESS) {
      yield put(getOrderByIdSuccess(order.data));
    }
  } catch (error) {
    yield put(getOrderByIdFailure(error));
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetOrderById() {
  yield takeLatest(getOrderByIdRequest, getOrderById);
}
function* updateOrder(action) {
  try {
    yield put(showLoading());
    let order = yield call(() => {
      return orderService.updateOrder(action.payload.infoUpdate);
    });
    if (order.status === STATUS_CODE.SUCCESS) {
      yield put(getOrderRequest(action.payload.restaurantId));
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(updateOrderFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionUpdateOrder() {
  yield takeLatest(updateOrderRequest, updateOrder);
}

function* refundOrder(action) {
  try {
    yield put(showLoading());
    const checkStatus = yield call(() => {
      return orderService.checkPayment(action.payload.infoUpdate.orderId);
    });
    if (checkStatus.data.returnCode === 1) {
      const order = yield call(() => {
        return orderService.refundPaymentZalo(action.payload.refundInfo);
      });
      if (order.status === STATUS_CODE.SUCCESS) {
        const orderCheckRefund = yield call(() => {
          return orderService.refundPaymentStatus(order.data.mrefundid);
        });
        if (orderCheckRefund.data.returnCode === 1) {
          const orderUpdateDeny = yield call(() => {
            return orderService.updateOrder(action.payload.infoUpdate);
          });
          if (orderUpdateDeny.status === STATUS_CODE.SUCCESS) {
            yield put(getOrderRequest(action.payload.restaurantId));
            openNotification(
              "success",
              "Thành công",
              "Giao dịch hoàn tiền thành công"
            );
          }
        } else {
          openNotification(
            "error",
            orderCheckRefund.data.returnMessage,
            "Giao dịch không hoàn tiền"
          );
        }
      }
    } else {
      openNotification("error", "Thất bại", checkStatus.data.returnMessage);
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(updateOrderFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionRefundOrder() {
  yield takeLatest(refundPaymentRequest, refundOrder);
}
