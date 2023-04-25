import { BaseService } from "./BaseService";

export class StatisticService extends BaseService {
  getStatistic = () => {
    return this.get("statistic");
  };
  getRevenueBetween = (model) => {
    return this.post(`statistic/detail/owner`, model);
  };
  getStatisticByDate = (model) => {
    return this.post(`revenues/bydate`, model);
  };
  // Statistic and Revenue of Restaurant
  getStatisticOfRes = (id) => {
    return this.get(`statistic/byrestaurant/${id}`);
  };
  getRevenueOfRes = (model) => {
    return this.post(`statistic/detail`, model);
  };
  getUserOfRes = (model) => {
    return this.post(`statistic/detail/user`, model);
  };
}

export const statisticService = new StatisticService();
