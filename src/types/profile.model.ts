/* eslint-disable no-unused-vars */
export interface IProvince {
  province_id: string;
  province_name: string;
  province_type: string;
}

export interface IDistrict {
  district_id: string;
  district_name: string;
  district_type: string;
  province_id: string;
}

export interface IWard {
  district_id: string;
  ward_id: string;
  ward_name: string;
  ward_type: string;
}

export interface IProfile {
  _id?: string;
  userId?: string;
  avatar: string;
  firstName: string;
  lastName: string;
  dob: string;
  province: string | null;
  district: string | null;
  ward: string | null;
  address: string;
  updatedAt?: string;
}

export interface IProfileResponse {
  data: IProfile | null;
  message: string;
  success: boolean;
}

export type IPersonalInfo = Pick<
  IProfile,
  "userId" | "firstName" | "lastName" | "dob"
>;

export type IPersonalAddress = Pick<
  IProfile,
  "userId" | "province" | "district" | "ward" | "address"
>;

export type IPersonalAvatar = Pick<IProfile, "avatar">;

export enum ProfileTabs {
  PERSONAL_INFO = "personal",
  PERSONAL_ADDRESS = "address",
  CHANGE_PSW = "change_psw",
  ORDER = "order",
  FAVORITE = "favorite"
}
