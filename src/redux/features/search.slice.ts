import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  value: string;
  showedSearchBar: boolean;
}

const initialState: SearchState = {
  value: "",
  showedSearchBar: false
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
    })
  }
});

// Action creators are generated for each case reducer function
export const { setSearchValue, showSearchBar, hideSearchBar } =
  searchSlice.actions;

export default searchSlice.reducer;
