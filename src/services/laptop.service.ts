import { laptopAPIs } from "constants/path.api";
import { ILaptop } from "types/laptop.model";
import { unauthorizedRequest } from "./request";

export const laptopServices = {
  async getListLaptop(): Promise<ILaptop[]> {
    const { data } = await unauthorizedRequest.get(laptopAPIs.LIST);
    return data.data;
  }
};
