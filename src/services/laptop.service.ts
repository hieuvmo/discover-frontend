import { laptopAPIs } from "constants/path.api";
import { ILaptop } from "types/laptop.model";
import { requestAPI } from "./request";

export const laptopServices = {
  async getListLaptop(): Promise<ILaptop> {
    const { data } = await requestAPI.get(laptopAPIs.LIST);
    return data;
  }
};
