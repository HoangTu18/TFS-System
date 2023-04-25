import { call, put, takeLatest } from "redux-saga/effects";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  deleteCustomerFaiture,
  deleteCustomerRequest,
  getCustomerFailure,
  getCustomerRequest,
  getCustomerSuccess,
  updateCustomerFailure,
  updateCustomerRequest,
} from "../../pages/CustomerManager/CustomerManageSlice";
import { customerService } from "../../services/customerService";
import { STATUS_CODE } from "../../ultil/settingSystem";

function* getCustomer() {
  try {
    yield put(showLoading());
    let listCustomer = yield call(() => {
      return customerService.getAllCustomer();
    });
    if (listCustomer.status === STATUS_CODE.SUCCESS) {
      yield put(getCustomerSuccess(listCustomer.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getCustomerFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionGetCustomer() {
  yield takeLatest(getCustomerRequest, getCustomer);
}
function* deleteCustomer(action) {
  try {
    yield put(showLoading());
    let customer = yield call(() => {
      return customerService.deleteCustomer(action.payload);
    });
    if (customer.status === STATUS_CODE.SUCCESS) {
      yield put(getCustomerRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    yield put(deleteCustomerFaiture(error));
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* folllowActionDeleteCustomer() {
  yield takeLatest(deleteCustomerRequest, deleteCustomer);
}
function* updateCustomer(action){
  try {
    yield put(showLoading())
    let customer = yield call(()=>{
      return customerService.updateCustomer(action.payload)
    })
    if(customer.status === STATUS_CODE.SUCCESS){
      yield put(getCustomerRequest())
    }
    yield put(hideLoading())
    openNotification('success',"Thành Công", "Thao tác của bạn thành công")
  } catch (error) {
    yield put(updateCustomerFailure(error))
    yield put(hideLoading())
    openNotification('error',"Thất Bại", "Thao tác của bạn thất bại")
  }
}
export function* followActionUpdateCustomer(){
  yield takeLatest(updateCustomerRequest,updateCustomer)
}