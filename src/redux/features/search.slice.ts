import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { CheckboxValueType } from "antd/es/checkbox/Group";

export interface SearchState {
  value: string;
  showedSearchBar: boolean;
  debouncedValue: string;
  checkedList: CheckboxValueType[];
}

const initialState: SearchState = {
  value: "",
  showedSearchBar: false,
  debouncedValue: "",
  checkedList: []
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state: SearchState, action: PayloadAction<string>) => ({
      ...state,
      value: action.payload
    }),
    showSearchBar: (state: SearchState) => ({
      ...state,
      showedSearchBar: true
    }),
    hideSearchBar: (state: SearchState) => ({
      ...state,
      showedSearchBar: false
    }),
    setDebouncedValue: (state: SearchState, action: PayloadAction<string>) => ({
      ...state,
      debouncedValue: action.payload
    }),
    setCheckedListBrand: (
      state: SearchState,
      action: PayloadAction<CheckboxValueType[]>
    ) => ({
      ...state,
      checkedList: action.payload
    })
  }
});

// Action creators are generated for each case reducer function
export const {
  setSearchValue,
  showSearchBar,
  hideSearchBar,
  setDebouncedValue,
  setCheckedListBrand
} = searchSlice.actions;

export default searchSlice.reducer;
