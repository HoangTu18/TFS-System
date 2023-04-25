import { BaseService } from "./BaseService";

class NotificationService extends BaseService {
  getNotification = (id) => {
    return this.get(`notifications/byaccount/${id}`);
  };
  checkedNotification = (id) => {
    return this.put(`notifications/checked/${id}`);
  };
}

export const notificationService = new NotificationService();
