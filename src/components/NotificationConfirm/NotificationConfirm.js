import { notification } from "antd";

export const openNotification = (type, message, description = "") => {
  notification[type]({
    message: message,
    description: description,
  });
  notification.config({
    bottom: 50,
    duration: 3,
  });
};
