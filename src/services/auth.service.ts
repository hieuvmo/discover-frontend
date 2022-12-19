import { authAPIs } from "constants/path.api";
import { ILogin, ISignUp, ISignUpResponse } from "types/auth.model";
import { requestAPI } from "./request";

export const authServices = {
  async signUp(params: ISignUp): Promise<ISignUpResponse> {
    const { data } = await requestAPI.post(authAPIs.SIGNUP, params);
    return data;
  },

  async login(param: ILogin) {
    const response = await requestAPI.post(authAPIs.LOGIN, param);
    return response;
  }
};
