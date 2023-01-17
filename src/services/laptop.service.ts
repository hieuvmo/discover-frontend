import { commentAPIs, laptopAPIs } from "constants/path.api";
import { ILaptop, ILaptopDetail } from "types/laptop.model";
import { ICommentInput, ICommentResponse } from "types/comment.model";
import { unauthorizedRequest } from "./request";

export const laptopServices = {
  async getListLaptop(): Promise<ILaptop[]> {
    const { data } = await unauthorizedRequest.get(laptopAPIs.LIST);
    return data.data;
  },

  async getLaptopDetail(id: string): Promise<ILaptopDetail> {
    const { data } = await unauthorizedRequest.get(laptopAPIs.DETAIL(id));
    return data;
  },

  async addNewComment(params: ICommentInput): Promise<ICommentResponse> {
    const { data } = await unauthorizedRequest.post(
      commentAPIs.ADD_NEW,
      params
    );
    return data;
  },

  async updateCommentById(
    params: ICommentInput,
    id: string
  ): Promise<ICommentResponse> {
    const { data } = await unauthorizedRequest.put(
      commentAPIs.UPDATE(id),
      params
    );
    return data;
  },

  async deleteCommentById(
    userId: string,
    id: string
  ): Promise<ICommentResponse> {
    const { data } = await unauthorizedRequest.delete(commentAPIs.DELETE(id), {
      data: {
        userId
      }
    });
    return data;
  }
};
