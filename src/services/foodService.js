import { BaseService } from "./BaseService";

class FoodService extends BaseService {
  getFood = () => {
    return this.get(`foods/purefood`);
  };
  insertFood = (model) => {
    return this.post(`foods`, model);
  };
  updateFood = (model) => {
    return this.put(`foods`, model);
  };
  deleteFood = (id) => {
    return this.delete(`foods/${id}`);
  };
  getCategory = () => {
    return this.get(`categories`);
  };
  addFoodtoCategory = (foodId, cateId) => {
    return this.post(`categories/${foodId}TO${cateId}`);
  };
  addFoodtoRegion = (foodId, regionId) => {
    return this.post(`regions/${foodId}TO${regionId}`);
  };
  getComboFood = () => {
    return this.get(`combos`);
  };
  insertComboFood = (model) => {
    return this.post(`combos`, model);
  };
  updateComboFood = (model) => {
    return this.put(`combos`, model);
  };
  deleteComboFood = (id) => {
    return this.delete(`combos/${id}`);
  };
}
export const foodService = new FoodService();
