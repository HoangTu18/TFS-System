import { createSlice } from "@reduxjs/toolkit";

export const feedbackManageSlice = createSlice({
  name: "feedbackManage",
  initialState: {
    listFeedback: [],
    isLoading: false,
  },
  reducers: {
    getFeedbackRequest: (state) => {
      return state;
    },
    getFeedbackSuccess: (state, action) => {
      state.listFeedback = action.payload;
      state.isLoading = false;
    },
    getFeedbackFailure: (state) => {
      return state;
    },
  },
});

export const { getFeedbackRequest, getFeedbackSuccess, getFeedbackFailure } =
  feedbackManageSlice.actions;

export default feedbackManageSlice.reducer;
