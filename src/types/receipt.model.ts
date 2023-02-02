import { IUserInfo } from "./auth.model";
import { ILaptop } from "./laptop.model";

export interface IReceipt {
  _id?: string;
  userId: IUserInfo;
  items: ILaptop[];
  cash: string;
  telephone: string;
  address: string;
  quantity: number[];
  lastModify?: string;
}

export type IReceiptInput = Omit<IReceipt, "userId" | "items"> & {
  userId: string;
  items: string[];
};

export interface IReceiptResponse {
  data: IReceiptInput;
  message: string;
}
