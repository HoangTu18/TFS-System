import { createSlice } from "@reduxjs/toolkit";

export const OverviewOfResSlice = createSlice({
  name: "overviewOfRes",
  initialState: {
    statistic: {},
    totalUser: "",
    revenue: [],
  },
  reducers: {
    //Get Statistic of Res
    getStatisticOfRes: (state, action) => {},
    getStatisticOfResSuccess: (state, action) => {
      state.statistic = action.payload;
    },
    getStatisticOfResFailure: (state) => {
      return state;
    }, // Get Revenue Of Res
    getRevenueOfRes: (state, action) => {},
    getRevenueOfResSuccess: (state, action) => {
      state.revenue = action.payload;
    },
    getRevenueOfResFailure: (state) => {
      return state;
    },
    getTotalUserOfResRequest: (state, action) => {},
    getTotalUserOfResSuccess: (state, action) => {
      state.totalUser = action.payload;
    },
  },
});
export const {
  getStatisticOfRes,
  getStatisticOfResSuccess,
  getStatisticOfResFailure,
  getRevenueOfRes,
  getRevenueOfResSuccess,
  getRevenueOfResFailure,
  getTotalUserOfResRequest,
  getTotalUserOfResSuccess,
} = OverviewOfResSlice.actions;

export default OverviewOfResSlice.reducer;
