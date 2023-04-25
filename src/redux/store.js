import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loadingReducer from "../components/Loading/LoadingSlice";
import accountManageReducer from "../pages/AccountManager/AccountManageSlice";
import customerManageReducer from "../pages/CustomerManager/CustomerManageSlice";
import eventManageReducer from "../pages/EventManager/eventManagerSlice";
import foodManageReducer from "../pages/FoodManager/foodManageSlice";
import restaurantManageReducer from "../pages/RestaurantManager/RestaurantManageSlice";
import orderManageReducer from "../pages/OrderManage/OrderManageSlice";
import regionManageReducer from "../pages/RegionManage/RegionManageSlice";
import serviceManageReducer from "../pages/ServiceManage/ServiceManageSlice";
import loginManageReducer from "../pages/Login/LoginManageSlice";
import promotionManageReducer from "../pages/PromotionManage/PromotionManageSlice";
import categoryManageReducer from "../pages/CategoryManager/CategoryManageSlice";
import staffOfResManageReducer from "../pages/StaffOfRestaurant/StaffOfRestaurantSlice";
import statisticReducer from "../pages/Overview/OverviewSlice";
import overviewOfResReducer from "../pages/OverviewOfRes/OverviewOfResSlice";
import notificationReducer from "../components/AdminPage/NotificationSlice";
import feedbackReducer from "../pages/FeedbackManager/feedbackSlice";

import rootSaga from "./saga/rootSaga";
const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    loading: loadingReducer,
    accountManage: accountManageReducer,
    customerManage: customerManageReducer,
    eventManage: eventManageReducer,
    foodManage: foodManageReducer,
    restaurantManage: restaurantManageReducer,
    orderManage: orderManageReducer,
    regionManage: regionManageReducer,
    serviceManage: serviceManageReducer,
    loginManage: loginManageReducer,
    promotionManage: promotionManageReducer,
    categoryManage: categoryManageReducer,
    staffOfResManage: staffOfResManageReducer,
    statisticManage: statisticReducer,
    overviewOfResManage: overviewOfResReducer,
    notificationManage: notificationReducer,
    feedbackManage: feedbackReducer,
  },
  middleware: [saga],
});
saga.run(rootSaga);
export default store;
