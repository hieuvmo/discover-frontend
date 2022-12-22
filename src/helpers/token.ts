import { authKeyStorage } from "constants/store.key";
import { destroyCookie, getCookie, setCookie } from "./storage";

const expirationToken = {
  EXPIRED_ACCESS_TOKEN: 1 / 48, // 2h
  EXPIRED_REFRESH_TOKEN: 7 // 7days
};

export const getAccessTokenFromCookie = () => {
  return getCookie(authKeyStorage.ACCESS_TOKEN);
};

export const getRefreshTokenFromCookie = () => {
  return getCookie(authKeyStorage.REFRESH_TOKEN);
};

export const setAccessTokenToCookie = (token: string) => {
  return setCookie(authKeyStorage.ACCESS_TOKEN, token, {
    expires: expirationToken.EXPIRED_ACCESS_TOKEN
  });
};

export const setRefreshTokenToCookie = (token: string) => {
  return setCookie(authKeyStorage.REFRESH_TOKEN, token, {
    expires: expirationToken.EXPIRED_REFRESH_TOKEN
  });
};

export const removeAccessTokenFromCookie = () => {
  return destroyCookie(authKeyStorage.ACCESS_TOKEN);
};

export const removeRefreshTokenFromCookie = () => {
  return destroyCookie(authKeyStorage.REFRESH_TOKEN);
};
