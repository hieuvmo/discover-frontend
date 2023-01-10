import { profileAPIs } from "constants/path.api";
import {
  IDistrict,
  IPersonalAddress,
  IPersonalAvatar,
  IPersonalInfo,
  IProfileResponse,
  IProvince
} from "types/profile.model";
import { unauthorizedRequest } from "./request";

export const profileServices = {
  async getAllProvince(): Promise<IProvince[]> {
    const { data } = await unauthorizedRequest.get(profileAPIs.PROVINCE);
    return data.results;
  },

  async getDistrictByProvinceId(provinceId: string): Promise<IDistrict[]> {
    const { data } = await unauthorizedRequest.get(
      profileAPIs.DISTRICT(provinceId)
    );
    return data.results;
  },

  async getWardByDistrictId(districtId: string): Promise<IProvince[]> {
    const { data } = await unauthorizedRequest.get(
      profileAPIs.WARD(districtId)
    );
    return data.results;
  },

  async updateProfile(
    params: IPersonalInfo | IPersonalAddress | IPersonalAvatar,
    userId: string
  ): Promise<IProfileResponse> {
    const { data } = await unauthorizedRequest.put(
      profileAPIs.UPDATE_PROFILE(userId),
      params
    );
    return data;
  },

  async uploadAvatar(avatar: FormData): Promise<string> {
    const { data } = await unauthorizedRequest.post(
      profileAPIs.UPLOAD_AVATAR,
      avatar,
      {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    );
    return data;
  }
};
