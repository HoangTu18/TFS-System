import { createSlice } from "@reduxjs/toolkit";

export const regionManageSlice = createSlice({
  name: "regionManage",
  initialState: {
    listRegion: [],
  },
  reducers: {
    getRegionRequest: (state) => {
      return state;
    },
    getRegionSuccess: (state, action) => {
      state.listRegion = action.payload;
    },
    getRegionFailure: (state) => {
      return state;
    },
    creatRegionRequest: (state, action) => {},
    createRegionFaiture: (state) => {
      return state;
    },
    updateRegionRequest: (state, action) => {},
    updateRegionFailure: (state) => {
      return state;
    },
    deleteRegionequest: (state) => {},
    deleteRegionFailure: (state) => {
      return state;
    },
  },
});

export const {
  getRegionRequest,
  getRegionSuccess,
  getRegionFailure,
  creatRegionRequest,
  createRegionFaiture,
  updateRegionRequest,
  updateRegionFailure,
} = regionManageSlice.actions;

export default regionManageSlice.reducer;
