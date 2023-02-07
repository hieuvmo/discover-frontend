import { IReceipt, IReceiptInput, IReceiptResponse } from "types/receipt.model";
import { receiptAPIS } from "constants/path.api";
import { unauthorizedRequest } from "./request";

export const receiptServices = {
  async addNewOrder(params: IReceiptInput): Promise<IReceiptResponse> {
    const { data } = await unauthorizedRequest.post(
      receiptAPIS.ADD_NEW,
      params
    );
    return data;
  },

  async getReceiptById(id: string): Promise<IReceipt[]> {
    const { data } = await unauthorizedRequest.get(receiptAPIS.GET_BY_ID(id));
    return data.data;
  }
};
