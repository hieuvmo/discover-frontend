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

export type IForgotPsw = Pick<ISignUp, "email">;
