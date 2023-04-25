import { BaseService } from "./BaseService";

class CustomerService extends BaseService {
  getAllCustomer = () => {
    return this.get("customers");
  };
  updateCustomer = (model)=>{
    return this.put(`customers`,model)
  }
  deleteCustomer = (id) => {
    return this.delete(`customers/${id}`);
  };
}
export const customerService = new CustomerService();
