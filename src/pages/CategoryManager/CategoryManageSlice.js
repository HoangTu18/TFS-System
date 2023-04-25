import { createSlice } from "@reduxjs/toolkit";

export const categoryManageSlice = createSlice({
  name: "categoryManage",
  initialState: {
    listCategory: [],
  },
  reducers: {
    getCategoryRequest: (state) => {
      return state;
    },
    getCategorySuccess: (state, action) => {
      state.listCategory = action.payload;
      state.isLoading = false;
    },
    getCategoryFailure: (state) => {
      return state;
    },
    insertCategoryRequest: (state, action) => {},
    insertCategoryFaiture: (state) => {
      return state;
    },
    updateCategoryRequest: (state, action) => {},
    updateCategoryFaiture: (state) => {
      return state;
    },
    deleteCategoryRequest: (state, action) => {},
    deleteCategoryFaiture: (state) => {
      return state;
    },
  },
});

export const {
  getCategoryRequest,
  getCategorySuccess,
  getCategoryFailure,
  insertCategoryRequest,
  insertCategoryFaiture,
  updateCategoryRequest,
  updateCategoryFaiture,
  deleteCategoryRequest,
  deleteCategoryFaiture,
} = categoryManageSlice.actions;

export default categoryManageSlice.reducer;
