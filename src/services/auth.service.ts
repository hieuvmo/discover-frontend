import { authAPIs } from "constants/path.api";
import {
  IChangePsw,
  IChangePswResponse,
  ILogin,
  ILoginResponse,
  ILogoutResponse,
  INewTokenResponse,
  ISignUp,
  ISignUpResponse
} from "types/auth.model";
import {
  unauthorizedRequest,
  authorizedRequest,
  refreshTokenRequest
} from "./request";

export const authServices = {
  async signUp(params: ISignUp): Promise<ISignUpResponse> {
    const { data } = await unauthorizedRequest.post(authAPIs.SIGNUP, params);
    return data;
  },

  async login(param: ILogin): Promise<ILoginResponse> {
    const { data } = await unauthorizedRequest.post(authAPIs.LOGIN, param);
    return data;
  },

  async genNewToken(): Promise<INewTokenResponse> {
    const { data } = await refreshTokenRequest.post(authAPIs.GEN_NEW_TOKEN);
    return data;
  },

  async logout(): Promise<ILogoutResponse> {
    const { data } = await authorizedRequest.post(authAPIs.LOGOUT);
    return data;
  },

  async changePassword(params: IChangePsw): Promise<IChangePswResponse> {
    const { data } = await authorizedRequest.post(
      authAPIs.CHANGE_PASSWORD,
      params
    );
    return data;
  }
};
