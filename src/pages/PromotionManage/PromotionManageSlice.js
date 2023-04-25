import { createSlice } from "@reduxjs/toolkit";

export const promotionManageSlice = createSlice({
  name: "promotionManage",
  initialState: {
    listPromotion: [],
  },
  reducers: {
    getPromotionRequest: (state) => {
      return state;
    },
    getPromotionSuccess: (state, action) => {
      state.listPromotion = action.payload;
    },
    getPromotionFailure: (state) => {
      return state;
    },
    insertPromotionRequest: (state, action) => {},
    insertPromotionFaiture: (state) => {
      return state;
    },
    updatePromotionRequest: (state, action) => {},
    updatePromotionFailure: (state) => {
      return state;
    },
    deletePromotionRequest: (state) => {},
    deletePromotionFailure: (state) => {
      return state;
    },
  },
});

export const {
  getPromotionRequest,
  getPromotionSuccess,
  getPromotionFailure,
  insertPromotionRequest,
  insertPromotionFaiture,
  updatePromotionRequest,
  updatePromotionFailure,
  deletePromotionRequest,
  deletePromotionFailure,
} = promotionManageSlice.actions;

export default promotionManageSlice.reducer;
