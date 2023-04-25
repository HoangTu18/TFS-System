// import "./antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import AccountManager from "./pages/AccountManager/AccountManager.page";
import CustomerManager from "./pages/CustomerManager/CustomerManager.page";
import Dashboard from "./pages/Dashboard/dashboard.component";
import FoodManager from "./pages/FoodManager/foodmanager.page";
import Login from "./pages/Login/login.page";
import RestaurantManager from "./pages/RestaurantManager/RestaurantManager.page";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import EventManager from "./pages/EventManager/eventManager.page";
import OrderManage from "./pages/OrderManage/OrderManage";
import ServiceManager from "./pages/ServiceManage/ServiceManager.page";
import PromotionManager from "./pages/PromotionManage/promotionmanager.page";
import CategoryManager from "./pages/CategoryManager/CategoryManager.page";
import PrivateRoute from "./ultil/ProtectedRoute/PrivateRoute";
import { USER_LOGIN } from "./ultil/settingSystem";
import PrivateAdmin from "./ultil/ProtectedRoute/PrivateAdmin";
import PrivateOwner from "./ultil/ProtectedRoute/PrivateOwner";
import PrivateManager from "./ultil/ProtectedRoute/PrivateManager";
import StaffOfRestaurant from "./pages/StaffOfRestaurant/StaffOfRestaurant";
import Overview from "./pages/Overview/Overview";
import OverviewOfRes from "./pages/OverviewOfRes/OverviewOfRes";
import Feedback from "./pages/FeedbackManager/Feedback";
function App() {
  return (
    <div>
      <Loading />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />}>
              {/* <Route path="" element={<AccountManager />} /> */}
              <Route //ROLE ADMIN
                path="employee"
                element={
                  <PrivateAdmin>
                    <AccountManager />
                  </PrivateAdmin>
                }
              />
              <Route
                path="customer"
                element={
                  <PrivateAdmin>
                    <CustomerManager />
                  </PrivateAdmin>
                }
              />
              <Route //ROLE OWNER
                path="overview"
                element={
                  <PrivateOwner>
                    <Overview />
                  </PrivateOwner>
                }
              />
              <Route //ROLE OWNER
                path="food"
                element={
                  <PrivateOwner>
                    <FoodManager />
                  </PrivateOwner>
                }
              />
              <Route
                path="restaurant"
                element={
                  <PrivateOwner>
                    <RestaurantManager />
                  </PrivateOwner>
                }
              />
              <Route
                path="event"
                element={
                  <PrivateOwner>
                    <EventManager />
                  </PrivateOwner>
                }
              />
              <Route
                path="service"
                element={
                  <PrivateOwner>
                    <ServiceManager />
                  </PrivateOwner>
                }
              />
              <Route
                path="promotion"
                element={
                  <PrivateOwner>
                    <PromotionManager />
                  </PrivateOwner>
                }
              />
              <Route
                path="category"
                element={
                  <PrivateOwner>
                    <CategoryManager />
                  </PrivateOwner>
                }
              />
              <Route //ROLE MANAGER
                path="overviewOfRes"
                element={
                  <PrivateManager>
                    <OverviewOfRes />
                  </PrivateManager>
                }
              />
              <Route // ROLE MANAGER
                path="order"
                element={
                  <PrivateManager>
                    <OrderManage />
                  </PrivateManager>
                }
              />
              <Route
                path="staffOfRestaurant"
                element={
                  <PrivateManager>
                    <StaffOfRestaurant />
                  </PrivateManager>
                }
              />
              <Route
                path="foodOfRes"
                element={
                  <PrivateManager>
                    <FoodManager />
                  </PrivateManager>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
