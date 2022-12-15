import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ILaptop } from "types/laptop.model";

export interface LaptopState {
  laptopList: ILaptop[];
  loading: boolean;
}

const initialState: LaptopState = {
  laptopList: [],
  loading: false
};

export const laptopSlice = createSlice({
  name: "laptop",
  initialState,
  reducers: {
    getLaptopListRequest: (state: LaptopState) => ({ ...state, loading: true }),
    getLaptopListComplete: (
      state: LaptopState,
      action: PayloadAction<ILaptop[]>
    ) => ({ ...state, laptopList: action.payload, loading: false })
  }
});

export const { getLaptopListRequest, getLaptopListComplete } =
  laptopSlice.actions;

export default laptopSlice.reducer;
