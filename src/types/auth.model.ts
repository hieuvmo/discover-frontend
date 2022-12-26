/* eslint-disable no-unused-vars */
export enum IUserRole {
  ADMIN = "Admin",
  USER = "User",
  SPECIALIST = "Specialist"
}

export enum IUserStatus {
  ACTIVE = "Active",
  IN_ACTIVE = "InActive",
  BAN = "Ban"
}

export interface IUserInfo {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  status: string;
  token: string;
}

export interface IProfile {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  updatedAt: string;
  avatar: string;
}

export interface ISignUp {
  email: string;
  password: string;
  confirmPsw?: string;
  firstName?: string;
  lastName?: string;
  role?: IUserRole;
  status?: IUserStatus;
}

export interface ISignUpResponse {
  message: string;
  success: boolean;
}

export interface ILogin extends Pick<ISignUp, "email" | "password"> {
  rememberPsw?: boolean;
}

export interface ILoginResponse {
  data: {
    userInfo: IUserInfo | null;
    profile: IProfile | null;
  };
  message: string;
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface ILogoutResponse extends ISignUpResponse {
  data?: IUserInfo;
}

export type IForgotPsw = Pick<ISignUp, "email">;

export type INewTokenResponse = Pick<
  ILoginResponse,
  "accessToken" | "refreshToken"
>;

export interface IChangePsw {
  userId?: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPsw?: string;
}
