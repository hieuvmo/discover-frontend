/* eslint-disable no-return-await */
import axios, { AxiosRequestConfig } from "axios";
import { notification } from "antd";

import { SERVICE_API } from "constants/path.api";
import { getCookie } from "helpers/storage";

export const requestAPI = axios.create({
  baseURL: SERVICE_API,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});

requestAPI.interceptors.request.use(
  (request: AxiosRequestConfig) => request,
  async (exception) => await Promise.reject(exception)
);

requestAPI.interceptors.response.use(
  (response: any) => response,
  async (exception) => {
    if (
      exception.response.status === 404 ||
      exception.response.status === 500
    ) {
      notification.error({
        message: "Hệ thống đang gặp lỗi. Vui lòng thử lại sau"
      });
    }
    return await Promise.reject(exception.response.data);
  }
);

export const requestHeader = axios.create({
  baseURL: SERVICE_API,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});

requestHeader.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    request.timeoutErrorMessage =
      "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại";
    const token = getCookie("access-token");
    request.headers = {
      Authorization: `Bearer ${token as string}`
    };
    return request;
  },
  async (exception) => await Promise.reject(exception)
);

requestHeader.interceptors.response.use(
  (response: any) => response,
  async (exception) => {
    if (
      exception.response.status === 404 ||
      exception.response.status === 500
    ) {
      notification.error({
        message: "Hệ thống đang gặp lỗi. Vui lòng thử lại sau"
      });
    }
    return await Promise.reject(exception.response.data);
  }
);
