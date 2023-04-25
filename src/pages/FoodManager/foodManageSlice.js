import { createSlice } from "@reduxjs/toolkit";

export const FoodManageSlice = createSlice({
  name: "foodManage",
  initialState: {
    listFood: [],
    listComboFood: [],
  },
  reducers: {
    //Get All Food
    getFoodRequest: (state) => {
      return state;
    },
    getFoodSuccess: (state, action) => {
      state.listFood = action.payload;
    },
    getFoodFailure: (state) => {
      return state;
    },
    insertFoodRequest: (state, action) => {},

    updateFoodRequest: (state, action) => {},

    deleteFoodRequest: (state, action) => {},
    //get Combo Food
    getComboFoodRequest: (state) => {
      return state;
    },
    getComboFoodSuccess: (state, action) => {
      state.listComboFood = action.payload;
    },
    getComboFoodFailure: (state) => {
      return state;
    },

    insertComboFoodRequest: (state, action) => {},

    updateComboFoodRequest: (state, action) => {},

    deleteComboFoodRequest: (state, action) => {},
  },
});
export const {
  getFoodRequest,
  getFoodSuccess,
  getFoodFailure,
  insertFoodRequest,
  updateFoodRequest,
  deleteFoodRequest,
  getComboFoodRequest,
  getComboFoodSuccess,
  getComboFoodFailure,
  insertComboFoodRequest,
  updateComboFoodRequest,
  deleteComboFoodRequest,
} = FoodManageSlice.actions;

export default FoodManageSlice.reducer;
