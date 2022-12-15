import { authAPIs } from "constants/path.api";
import { ILogin } from "types/auth.model";
import { requestAPI } from "./request";

export const authServices = {
  async login(param: ILogin) {
    const response = await requestAPI.post(authAPIs.LOGIN, param);
    return response;
  }
};
