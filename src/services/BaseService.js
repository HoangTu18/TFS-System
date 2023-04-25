import axios from "axios";
import { DOMAIN } from "../ultil/settingSystem";

export class BaseService {
  get = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      data: model,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  post = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  put = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "PUT",
      data: model,
      // headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  delete = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "DELETE",
      data: model,
      // headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
}
