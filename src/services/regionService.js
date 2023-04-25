import { BaseService } from "./BaseService";

class RegionService extends BaseService {
  getRegion = () => {
    return this.get(`regions`);
  };
  createRegion = (model) => {
    return this.post(`regions`, model);
  };
  updateRegion = (model) => {
    return this.put(`regions`, model);
  };
  deleteRegion = (id) => {
    return this.delete(`regions/${id}`);
  };
}

export const regionService = new RegionService();
