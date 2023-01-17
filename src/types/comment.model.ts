import { IUserInfo } from "./auth.model";
import { IProfile } from "./profile.model";

export interface IComment {
  _id: string;
  userId: IUserInfo;
  userProfile: IProfile[];
  comment: string;
  laptopId: string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  updatedAt: string;
}

export type ICommentInput = Omit<IComment, "_id" | "userId" | "userProfile"> & {
  userId: string;
};

export type ICommentData = Omit<IComment, "userProfile"> & {
  userId: string;
};

export interface ICommentResponse {
  data: ICommentData | null;
  message: string;
  success: boolean;
}
