import { BaseService } from "./BaseService";
class OrderService extends BaseService {
  getOrder = () => {
    return this.get("orders");
  };
  getOrderByRestaurantId = (id) => {
    return this.get(`orders/restaurant/${id}`);
  };
  getOrderById = (id) => {
    return this.get(`orders/${id}`);
  };
  updateOrder = (model) => {
    return this.put(`orders/status`, model);
  };
  checkPayment = (id) => {
    return this.get(`orders/checkZalopayPayment/${id}`);
  };
  refundPaymentZalo = (model) => {
    return this.post(`orders/refundZalopay`, model);
  };
  refundPaymentStatus = (mrefundId) => {
    return this.get(`orders/refundStatus/${mrefundId}`);
  };
}

export const orderService = new OrderService();
