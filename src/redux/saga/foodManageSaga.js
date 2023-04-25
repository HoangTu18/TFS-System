import { call, put, takeLatest } from "redux-saga/effects";

import {
  getFoodRequest,
  getFoodSuccess,
  getFoodFailure,
  updateFoodRequest,
  deleteFoodRequest,
  insertFoodRequest,
  getComboFoodRequest,
  getComboFoodSuccess,
  getComboFoodFailure,
  insertComboFoodRequest,
  updateComboFoodRequest,
  deleteComboFoodRequest,
} from "../../pages/FoodManager/foodManageSlice";
import { getCategoryRequest } from "../../pages/CategoryManager/CategoryManageSlice";
import { getRegionRequest } from "../../pages/RegionManage/RegionManageSlice";

import { foodService } from "../../services/foodService";
import { STATUS_CODE } from "../../ultil/settingSystem";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";

function* getFood() {
  try {
    yield put(showLoading());
    let listFood = yield call(() => {
      return foodService.getFood();
    });
    if (listFood.status === STATUS_CODE.SUCCESS) {
      yield put(getFoodSuccess(listFood.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getFoodFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetFoods() {
  yield takeLatest(getFoodRequest, getFood);
}

function* insertFood(action) {
  try {
    yield put(showLoading());
    let listFood = yield call(() => {
      return foodService.insertFood(action.payload);
    });
    if (listFood.status === STATUS_CODE.SUCCESS) {
      console.log(action.payload.cateId);
      let foodToCategory = yield call(() => {
        return foodService.addFoodtoCategory(
          listFood.data.id,
          action.payload.cateId
        );
      });
      if (foodToCategory.status === STATUS_CODE.SUCCESS) {
        let foodToRegion = yield call(() => {
          return foodService.addFoodtoRegion(
            listFood.data.id,
            action.payload.regionId
          );
        });
        if (foodToRegion.status === STATUS_CODE.SUCCESS) {
          yield put(hideLoading());
        }
      }
    }
    yield put(getFoodRequest());
    yield put(getRegionRequest());
    yield put(getCategoryRequest());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionInsertFood() {
  yield takeLatest(insertFoodRequest, insertFood);
}

function* updateFood(action) {
  try {
    yield put(showLoading());
    let listFood = yield call(() => {
      return foodService.updateFood(action.payload);
    });
    if (listFood.status === STATUS_CODE.SUCCESS) {
      console.log(action.payload.cateId);
      let foodToCategory = yield call(() => {
        return foodService.addFoodtoCategory(
          listFood.data.id,
          action.payload.cateId
        );
      });
      if (foodToCategory.status === STATUS_CODE.SUCCESS) {
        let foodToRegion = yield call(() => {
          return foodService.addFoodtoRegion(
            listFood.data.id,
            action.payload.regionId
          );
        });
        if (foodToRegion.status === STATUS_CODE.SUCCESS) {
          yield put(hideLoading());
        }
      }
    }
    yield put(getFoodRequest());
    yield put(getRegionRequest());
    yield put(getCategoryRequest());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield hideLoading();
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionUpdateFood() {
  yield takeLatest(updateFoodRequest, updateFood);
}

function* deleteFood(action) {
  try {
    yield put(showLoading());
    let listFood = yield call(() => {
      return foodService.deleteFood(action.payload);
    });
    if (listFood.status === STATUS_CODE.SUCCESS) {
      yield put(getFoodRequest());
      yield put(hideLoading());
    }
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActionDeleteFood() {
  yield takeLatest(deleteFoodRequest, deleteFood);
}

function* getComboFood() {
  try {
    yield put(showLoading());
    let listComboFood = yield call(() => {
      return foodService.getComboFood();
    });
    if (listComboFood.status === STATUS_CODE.SUCCESS) {
      yield put(getComboFoodSuccess(listComboFood.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getComboFoodFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetComboFoods() {
  yield takeLatest(getComboFoodRequest, getComboFood);
}

function* insertComboFood(action) {
  try {
    yield put(showLoading());
    let listComboFood = yield call(() => {
      return foodService.insertComboFood(action.payload);
    });
    if (listComboFood.status === STATUS_CODE.SUCCESS) {
      yield put(hideLoading());
    }
    yield put(getComboFoodRequest());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    // console.log(error);
    if (error.response.data) {
      console.log(error.response.data);
    }
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionInsertComboFood() {
  yield takeLatest(insertComboFoodRequest, insertComboFood);
}

function* updateComboFood(action) {
  try {
    yield put(showLoading());
    let listComboFood = yield call(() => {
      return foodService.updateComboFood(action.payload);
    });
    if (listComboFood.status === STATUS_CODE.SUCCESS) {
      yield put(hideLoading());
    }
    yield put(getComboFoodRequest());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield hideLoading();
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionUpdateComboFood() {
  yield takeLatest(updateComboFoodRequest, updateComboFood);
}

function* deleteComboFood(action) {
  try {
    yield put(showLoading());
    let listComboFood = yield call(() => {
      return foodService.deleteComboFood(action.payload);
    });
    if (listComboFood.status === STATUS_CODE.SUCCESS) {
      yield put(hideLoading());
    }
    yield put(getComboFoodRequest());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActionDeleteComboFood() {
  yield takeLatest(deleteComboFoodRequest, deleteComboFood);
}
