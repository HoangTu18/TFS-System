import { BaseService } from "./BaseService";

class ServiceService extends BaseService {
  getService = () => {
    return this.get(`services`);
  };
  insertService = (model) => {
    return this.post(`services`, model);
  };
  updateService = (model) => {
    return this.put(`services`, model);
  };
  deleteService = (id) => {
    return this.delete(`service/${id}`);
  };
}

export const serviceService = new ServiceService();
