import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IComment, ILaptop } from "types/laptop.model";

export interface LaptopState {
  laptopList: ILaptop[];
  laptopDetail: ILaptop | null;
  commentList: IComment[];
  loading: boolean;
}

const initialState: LaptopState = {
  laptopList: [],
  laptopDetail: null,
  commentList: [],
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
      loading: true
    }),
    getLaptopDetailActionComplete: (
      state: LaptopState,
      action: PayloadAction<{ laptop: ILaptop | null; comments: IComment[] }>
    ) => ({
      ...state,
      loading: false,
      laptopDetail: action.payload.laptop,
      commentList: action.payload.comments
    })
  }
});

export const {
  getLaptopListRequest,
  getLaptopListComplete,
  getLaptopDetailActionRequest,
  getLaptopDetailActionComplete
} = laptopSlice.actions;

export default laptopSlice.reducer;
