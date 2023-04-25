import axios from "axios";
import { DOMAIN } from "./settingSystem";
const request = axios.create({
  baseURL: DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(async (config) => {
  return config;
});

export const get = async (path, option = {}) => {
  const response = await request.get(path, option);
  return response.data;
};

export const remove = async (path, option) => {
  const response = await request.delete(path, option);
  return response.data;
};

export default request;
