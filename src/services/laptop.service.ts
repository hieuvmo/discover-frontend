import { laptopAPIs } from "constants/path.api";
import { ILaptop, ILaptopDetail } from "types/laptop.model";
import { unauthorizedRequest } from "./request";

export const laptopServices = {
  async getListLaptop(): Promise<ILaptop[]> {
    const { data } = await unauthorizedRequest.get(laptopAPIs.LIST);
    return data.data;
  },

  async getLaptopDetail(id: string): Promise<ILaptopDetail> {
    const { data } = await unauthorizedRequest.get(laptopAPIs.DETAIL(id));
    return data;
  }
};
