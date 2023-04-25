import { BaseService } from "./BaseService";

class AccountService extends BaseService {
  getStaff = () => {
    return this.get(`staffs`);
  };
  createStaff = (model) => {
    return this.post(`staffs`, model);
  };
  updateStaff = (model) =>{
    return this.put(`staffs`,model)
  }
  deleteStaff = (id)=>{
    return this.delete(`staffs/${id}`)
  }
  getRole = () => {
    return this.get(`roles`);
  };
}
export const accountService = new AccountService();
