import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

const config: AxiosRequestConfig = {
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
  headers: {
    ContentType: "application/json",
  },
};

export const api: AxiosInstance = axios.create(config);

api.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
