import { call, put, takeLatest } from "redux-saga/effects";

import {
  getCategoryRequest,
  getCategorySuccess,
  getCategoryFailure,
  insertCategoryFaiture,
  insertCategoryRequest,
  updateCategoryFaiture,
  updateCategoryRequest,
  deleteCategoryFaiture,
  deleteCategoryRequest,
} from "../../pages/CategoryManager/CategoryManageSlice";

import { categoryService } from "../../services/CategoryService";
import { STATUS_CODE } from "../../ultil/settingSystem";
import { openNotification } from "../../components/NotificationConfirm/NotificationConfirm";
import {
  hideLoading,
  showLoading,
} from "../../components/Loading/LoadingSlice";

function* getCategory() {
  try {
    yield put(showLoading());
    let listCategory = yield call(() => {
      return categoryService.getCategory();
    });
    if (listCategory.status === STATUS_CODE.SUCCESS) {
      yield put(getCategorySuccess(listCategory.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getCategoryFailure(error));
    yield put(hideLoading());
    openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetCategories() {
  yield takeLatest(getCategoryRequest, getCategory);
}

function* insertCategory(action) {
  try {
    yield put(showLoading());
    let listCategory = yield call(() => {
      return categoryService.insertCategory(action.payload);
    });
    if (listCategory.status === STATUS_CODE.SUCCESS) {
      yield put(getCategoryRequest());
      openNotification(
        "success",
        "Thành Công",
        "Thao tác của bạn đã thành công"
      );
    }
  } catch (error) {
    yield put(hideLoading());
    yield put(insertCategoryFaiture(action.payload));
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActioninsertCategories() {
  yield takeLatest(insertCategoryRequest, insertCategory);
}

function* updateCategory(action) {
  try {
    yield put(showLoading());
    let listCategory = yield call(() => {
      return categoryService.updateCategory(action.payload);
    });
    if (listCategory.status === STATUS_CODE.SUCCESS) {
      yield put(getCategoryRequest());
    }
    yield hideLoading();
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    yield put(updateCategoryFaiture(action.payload));
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}
export function* followActionUpdateCategories() {
  yield takeLatest(updateCategoryRequest, updateCategory);
}

function* deleteCategory(action) {
  try {
    yield put(showLoading());
    let listCategory = yield call(() => {
      return categoryService.deleteCategory(action.payload);
    });
    if (listCategory.status === STATUS_CODE.SUCCESS) {
      yield put(getCategoryRequest());
    }
    yield put(hideLoading());
    openNotification("success", "Thành Công", "Thao tác của bạn đã thành công");
  } catch (error) {
    console.log(error);
    yield put(hideLoading());
    yield put(deleteCategoryFaiture(action.payload));
    openNotification("error", "Thất Bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActionDeleteCategories() {
  yield takeLatest(deleteCategoryRequest, deleteCategory);
}
