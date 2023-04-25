import { createSlice } from "@reduxjs/toolkit";

export const StaffOfRestaurant = createSlice({
  name: "staffOfRestaurantManage",
  initialState: {
    listStaffOfRes: [],
  },
  reducers: {
    getStaffOfResRequest: (state, action) => {},
    getStaffOfResSuccess: (state, action) => {
      state.listStaffOfRes = action.payload;
    },
    getStaffOfResFailure: (state) => {},
    updateStaffOfRes: (state) => {},
    updateStaffOfResFailure: (state) => {},
  },
});
export const {
  getStaffOfResSuccess,
  getStaffOfResRequest,
  getStaffOfResFailure,
  updateStaffOfRes,
  updateStaffOfResFailure,
} = StaffOfRestaurant.actions;
export default StaffOfRestaurant.reducer;
