import { all } from "redux-saga/effects";
import * as accountManageSaga from "./accountManageSaga";
import * as customerSaga from "./customerManageSaga";
import * as eventSaga from "./eventManageSage";
import * as foodSaga from "./foodManageSaga";
import * as restaurantSaga from "./restaurantManageSaga";
import * as orderSaga from "./orderManageSaga";
import * as regionSaga from "./regionManageSaga";
import * as serviceSaga from "./serviceManageSaga";
import * as loginSaga from "./loginManageSaga";
import * as promotionSaga from "./promotionSage";
import * as categorySaga from "./categoryManageSaga";
import * as staffOfResSaga from "./staffOfRestaurantSaga";
import * as statisticSaga from "./statisticManagerSaga";
import * as statisticOfResSaga from "./overviewOfResSaga";
import * as notificationSaga from "./notificationManageSaga";
import * as feedbackSaga from "./feedbackManageSaga";

export default function* rootSaga() {
  yield all([
    // Saga Staff
    accountManageSaga.followActiongetAccount(),
    accountManageSaga.followActionGetRole(),
    accountManageSaga.followActionCreateStaff(),
    accountManageSaga.followActionUpdateStaff(),
    accountManageSaga.followActionDeleteStaff(),
    //Saga Customer
    customerSaga.followActionGetCustomer(),
    customerSaga.folllowActionDeleteCustomer(),
    //Saga Event
    eventSaga.followActiongetEvents(),
    eventSaga.followActioninsertEvents(),
    eventSaga.followActionUpdateEvent(),
    eventSaga.followActionDeleteEvent(),
    //Saga Food
    foodSaga.followActiongetFoods(),
    foodSaga.followActionUpdateFood(),
    foodSaga.followActionDeleteFood(),
    foodSaga.followActionInsertFood(),
    foodSaga.followActiongetComboFoods(),
    foodSaga.followActionInsertComboFood(),
    foodSaga.followActionUpdateComboFood(),
    foodSaga.followActionDeleteComboFood(),
    customerSaga.followActionUpdateCustomer(),
    //Saga Restaurant
    restaurantSaga.followActionGetRestaurant(),
    restaurantSaga.followActionCreateRestaurant(),
    restaurantSaga.followActionUpdateRestaurant(),
    restaurantSaga.followActionDeleteRestaurant(),
    restaurantSaga.followActionGetRestaurantByStaff(),
    restaurantSaga.followActionRemoveStaffFromRes(),
    //Saga Order
    orderSaga.followActionGetOrder(),
    orderSaga.followActionGetOrderById(),
    orderSaga.followActionUpdateOrder(),
    orderSaga.followActionRefundOrder(),
    //Sage Region
    regionSaga.followActiongetRegions(),
    //Sage Service
    serviceSaga.followActionGetService(),
    serviceSaga.followActioninsertServices(),
    serviceSaga.followActionUpdateService(),
    serviceSaga.followActionDeleteService(),
    //Saga Login
    loginSaga.followActionLogin(),
    //Sage Promotion,
    promotionSaga.followActiongetPromotions(),
    promotionSaga.followActioninsertPromotions(),
    promotionSaga.followActionUpdatePromotion(),
    promotionSaga.followActionDeletePromotion(),
    //Saga Category,
    categorySaga.followActiongetCategories(),
    categorySaga.followActioninsertCategories(),
    categorySaga.followActionUpdateCategories(),
    categorySaga.followActionDeleteCategories(),
    //Saga Staff Of Restaurant
    staffOfResSaga.followActionGetStaffOfRes(),
    //Saga Statistic
    statisticSaga.followActionGetStatistic(),
    statisticSaga.followActionGetRevenueBetween(),
    //Overview Of Restaurant
    statisticOfResSaga.followActionGetStatisticOfRes(),
    statisticOfResSaga.followActionGetRevenueOfRes(),
    statisticOfResSaga.followActionGetTotalUserOfRes(),
    //Notification
    notificationSaga.followActionGetNotification(),
    //Feedback
    feedbackSaga.followActiongetFeedbackList(),
    notificationSaga.followActionCheckedNotification(),
  ]);
}
