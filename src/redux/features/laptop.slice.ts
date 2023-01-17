import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserInfo } from "types/auth.model";
import { IComment, ICommentInput, ICommentResponse } from "types/comment.model";
import { ILaptop } from "types/laptop.model";
import { IProfile } from "types/profile.model";

export interface LaptopState {
  laptopList: ILaptop[];
  laptopDetail: ILaptop | null;
  commentList: IComment[];
  commentItem: IComment | null;
  success: boolean | null;
  message: string;
  commentItemLoading: boolean;
  deleteLoading: boolean;
  loading: boolean;
}

const initialState: LaptopState = {
  laptopList: [],
  laptopDetail: null,
  commentList: [],
  commentItem: null,
  success: null,
  message: "",
  commentItemLoading: false,
  deleteLoading: false,
  loading: false
};

export const laptopSlice = createSlice({
  name: "laptop",
  initialState,
  reducers: {
    getLaptopListRequest: (state: LaptopState) => ({
      ...state,
      loading: true
    }),
    getLaptopListComplete: (
      state: LaptopState,
      action: PayloadAction<ILaptop[]>
    ) => ({
      ...state,
      laptopList: action.payload,
      loading: false
    }),
    getLaptopDetailActionRequest: (
      state: LaptopState,
      action: PayloadAction<string>
    ) => ({
      ...state,
      commentItemLoading: true
    }),
    getLaptopDetailActionComplete: (
      state: LaptopState,
      action: PayloadAction<{ laptop: ILaptop | null; comments: IComment[] }>
    ) => ({
      ...state,
      commentItemLoading: false,
      laptopDetail: action.payload.laptop,
      commentList: action.payload.comments
    }),
    resetComment: (state: LaptopState) => ({
      ...state,
      success: null,
      message: ""
    }),
    addNewCommentActionRequest: (
      state: LaptopState,
      action: PayloadAction<{
        input: ICommentInput;
        userInfo: IUserInfo;
        profile: IProfile[];
        onFinish: () => void;
      }>
    ) => ({
      ...state,
      loading: true
    }),
    addNewCommentActionComplete: (
      state: LaptopState,
      action: PayloadAction<{
        response: ICommentResponse;
        userInfo: IUserInfo;
        profile: IProfile[];
      }>
    ) => {
      const { response, userInfo, profile } = action.payload;
      const addedCommentList = () => {
        if (response.data)
          return [
            ...state.commentList,
            {
              ...response.data,
              userId: userInfo,
              userProfile: profile
            }
          ];
        return state.commentList;
      };

      return {
        ...state,
        loading: false,
        success: response.success,
        message: response.message,
        commentList: addedCommentList()
      };
    },
    setCommentItem: (state: LaptopState, action: PayloadAction<IComment>) => ({
      ...state,
      commentItem: action.payload
    }),
    setNullCommentItem: (state: LaptopState) => ({
      ...state,
      commentItem: null
    }),
    updateCommentByIdActionRequest: (
      state: LaptopState,
      action: PayloadAction<{
        input: ICommentInput;
        commentId: string;
        onFinish: () => void;
      }>
    ) => ({
      ...state,
      loading: true
    }),
    updateCommentByIdActionComplete: (
      state: LaptopState,
      action: PayloadAction<ICommentResponse>
    ) => {
      const { data, message, success } = action.payload;

      const updatedCommentList: IComment[] = [];
      let updatedCommentItem: IComment | null = null;
      state.commentList.forEach((comment: IComment) => {
        if (data && comment._id === data._id) {
          updatedCommentItem = {
            ...comment,
            rating: data.rating,
            comment: data.comment,
            updatedAt: data.updatedAt
          };
        } else {
          updatedCommentList.push(comment);
        }
      });
      if (updatedCommentItem) {
        updatedCommentList.push(updatedCommentItem);
      }

      return {
        ...state,
        loading: false,
        success,
        message,
        commentList: data ? updatedCommentList : state.commentList
      };
    },
    deleteCommentByIdActionRequest: (
      state: LaptopState,
      action: PayloadAction<{
        userId: string;
        commentId: string;
        onFinish: () => void;
      }>
    ) => ({
      ...state,
      deleteLoading: true
    }),
    deleteCommentByIdActionComplete: (
      state: LaptopState,
      action: PayloadAction<ICommentResponse>
    ) => {
      const { data, message, success } = action.payload;

      const deletedCommentList = state.commentList.filter(
        (comment: IComment) => comment._id !== data?._id
      );

      return {
        ...state,
        deleteLoading: false,
        success,
        message,
        commentList: data ? deletedCommentList : state.commentList
      };
    }
  }
});

export const {
  getLaptopListRequest,
  getLaptopListComplete,
  getLaptopDetailActionRequest,
  getLaptopDetailActionComplete,
  resetComment,
  addNewCommentActionRequest,
  addNewCommentActionComplete,
  setCommentItem,
  setNullCommentItem,
  updateCommentByIdActionRequest,
  updateCommentByIdActionComplete,
  deleteCommentByIdActionRequest,
  deleteCommentByIdActionComplete
} = laptopSlice.actions;

export default laptopSlice.reducer;
