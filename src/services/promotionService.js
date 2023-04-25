import { BaseService } from "./BaseService";

class PromotionService extends BaseService {
  getPromotion = () => {
    return this.get(`promotions`);
  };
  insertPromotion = (model) => {
    return this.post(`promotions`, model);
  };
  updatePromotion = (model) => {
    return this.put(`promotions`, model);
  };
  deletePromotion = (id) => {
    return this.delete(`promotions/${id}`);
  };
}

export const promotionService = new PromotionService();
