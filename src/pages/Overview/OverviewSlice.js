import { createSlice } from "@reduxjs/toolkit";

export const statisticSlice = createSlice({
  name: "statistic",
  initialState: {
    statistic: {},
    revenue: [],
  },
  reducers: {
    // Get statistic
    getStatisticRequest: (state) => {
      return state;
    },
    getStatisticSuccess: (state, action) => {
      state.statistic = action.payload;
    },
    getStatisticFailure: (state) => {
      return state;
    },
    // Get Revenue By Date
    getRevenueByDateRequest: (state) => {
      return state;
    },
    getRevenueByDateSuccess: (state, action) => {
      state.revenue = action.payload;
    },
    getRevenueByDateFailure: (state) => {
      return state;
    },
    // Get Revenue By Date
    getRevenueBetweenRequest: (state, action) => {
      return state;
    },
    getRevenueBetweenSuccess: (state, action) => {
      state.revenue = action.payload;
    },
    getRevenueBetweenFailure: (state) => {
      return state;
    },
  },
});

export const {
  getStatisticRequest,
  getStatisticSuccess,
  getStatisticFailure,
  getRevenueByDateRequest,
  getRevenueByDateSuccess,
  getRevenueByDateFailure,
  getRevenueBetweenRequest,
  getRevenueBetweenSuccess,
  getRevenueBetweenFailure,
} = statisticSlice.actions;

export default statisticSlice.reducer;
