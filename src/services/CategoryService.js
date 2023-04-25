import { BaseService } from "./BaseService";

class CategoryService extends BaseService {
  getCategory = () => {
    return this.get(`categories`);
  };
  insertCategory = (model) => {
    return this.post(`categories`, model);
  };
  updateCategory = (model) => {
    return this.put(`categories`, model);
  };
  deleteCategory = (id) => {
    return this.delete(`categories/${id}`);
  };
}
export const categoryService = new CategoryService();
