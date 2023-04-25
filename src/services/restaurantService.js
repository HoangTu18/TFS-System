import { BaseService } from "./BaseService";

class RestaurantService extends BaseService {
  getRestaurant = () => {
    return this.get(`restaurants`);
  };
  getRestaurantByStaffId = (id) => {
    return this.get(`manager/${id}`);
  };
  getRestaurantById = (id) => {
    return this.get(`restaurants/${id}`);
  };
  createRestaurant = (model) => {
    return this.post(`restaurants`, model);
  };
  updateRestaurant = (model) => {
    return this.put(`restaurants`, model);
  };
  deleteRestaurant = (id) => {
    return this.delete(`restaurants/${id}`);
  };
  removeStaffFromRes = (id) => {
    return this.delete(`restaurants/remove/${id}`);
  };
}

export const restaurantService = new RestaurantService();
