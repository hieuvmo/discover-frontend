/* eslint-disable no-return-await */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { notification } from "antd";

import { SERVICE_API } from "constants/path.api";
import { i18nTranslate } from "helpers/language";
import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  setAccessTokenToCookie,
  setRefreshTokenToCookie
} from "helpers/token";
import { resetLoginData, showLoginFormModal } from "redux/features/auth.slice";
import { dispatchFunction } from "redux/store";
import { authServices } from "./auth.service";

export const unauthorizedRequest = axios.create({
  baseURL: SERVICE_API,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});

unauthorizedRequest.interceptors.request.use(
  (request: AxiosRequestConfig) => request,
  async (exception) => await Promise.reject(exception)
);

unauthorizedRequest.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  async (exception) => {
    if (
      exception.response.status === 404 ||
      exception.response.status === 500
    ) {
      notification.error({
        message: i18nTranslate("common:system_error")
      });
    }
    return await Promise.reject(exception.response.data);
  }
);

export const authorizedRequest = axios.create({
  baseURL: SERVICE_API,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});

authorizedRequest.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    request.timeoutErrorMessage = i18nTranslate("common:expired_token");
    const accessToken = getAccessTokenFromCookie();
    if (request.headers)
      request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
  },
  async (exception) => await Promise.reject(exception)
);

authorizedRequest.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  async (exception) => {
    const originalRequest = exception.config;
    const accessToken = getAccessTokenFromCookie();
    const refreshToken = getRefreshTokenFromCookie();

    if (
      exception.response.status === 404 ||
      exception.response.status === 500
    ) {
      notification.error({
        message: i18nTranslate("common:system_error")
      });
    }

    // expired accessToken and valid refreshToken
    if (exception.response.status === 401 && !accessToken && refreshToken) {
      try {
        const response = await authServices.genNewToken();
        const newAccessToken = response.accessToken;
        const newRefreshToken = response.refreshToken;

        setAccessTokenToCookie(newAccessToken);
        setRefreshTokenToCookie(newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // after gen new token => run before request
        return authorizedRequest(originalRequest);
      } catch (error) {
        notification.error({
          message: i18nTranslate("common:system_error")
        });
      }
    }

    // expired accessToken and expired refreshToken
    if (exception.response.status === 401 && !accessToken && !refreshToken) {
      dispatchFunction(resetLoginData());
      dispatchFunction(showLoginFormModal());
      notification.error({
        message: i18nTranslate("common:expired_token")
      });
    }

    return await Promise.reject(exception.response.data);
  }
);

// only use in api gen new token
export const refreshTokenRequest = axios.create({
  baseURL: SERVICE_API,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});

refreshTokenRequest.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    request.timeoutErrorMessage = i18nTranslate("common:expired_token");
    const refreshToken = getRefreshTokenFromCookie();
    if (request.headers)
      request.headers.Authorization = `Bearer ${refreshToken}`;
    return request;
  },
  async (exception) => await Promise.reject(exception)
);

refreshTokenRequest.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  async (exception) => {
    if (
      exception.response.status === 404 ||
      exception.response.status === 500
    ) {
      notification.error({
        message: i18nTranslate("common:system_error")
      });
    }
    return await Promise.reject(exception.response.data);
  }
);
