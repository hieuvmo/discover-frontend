import { profileAPIs } from "constants/path.api";
import { IDistrict, IProvince } from "types/profile.model";
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
  }
};
