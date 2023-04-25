import { createSlice } from "@reduxjs/toolkit";

export const NotificationSlice = createSlice({
  name: "notificationManage",
  initialState: {
    notificationList: [],
  },
  reducers: {
    //Get Notification
    getNotificationRequest: (state, action) => {},
    getNotificationSuccess: (state, action) => {
      state.notificationList = action.payload;
    },
    getNotificationFailure: (state) => {
      return state;
    },
    // Checked Notification
    checkedNotificationRequest: (state, action) => {},
    checkedNotificationSuccess: (state, action) => {},
  },
});

export const {
  getNotificationRequest,
  getNotificationSuccess,
  getNotificationFailure,
  checkedNotificationRequest,
  checkedNotificationSuccess,
} = NotificationSlice.actions;
export default NotificationSlice.reducer;
