import Cookies from "js-cookie";

interface CookieAttributes {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None";
  [property: string]: any;
}

export const getLocalStorageItem = (key: string) => localStorage.getItem(key);

export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const destroyLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

export const destroyAllLocalStorageItem = () => {
  localStorage.clear();
};

export const setCookie = (
  name: string,
  value: string,
  option?: CookieAttributes
) => {
  Cookies.set(name, value, option);
};

export const getCookie = (name: string) => Cookies.get(name);

export const destroyCookie = (key: string, option?: CookieAttributes) => {
  Cookies.remove(key, option || undefined);
};
