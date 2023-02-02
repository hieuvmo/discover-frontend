import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { i18nTranslate } from "helpers/language";
import { ILaptop } from "types/laptop.model";

export interface FavoriteState {
  favoriteList: ILaptop[];
}

const initialState: FavoriteState = {
  favoriteList: []
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavoriteList: (
      state: FavoriteState,
      action: PayloadAction<ILaptop>
    ) => {
      notification.success({
        message: i18nTranslate("cart:add_to_favorite"),
        description: i18nTranslate("cart:add_to_favorite_success")
      });
      return {
        ...state,
        favoriteList: [...state.favoriteList, action.payload]
      };
    },
    removeFromFavoriteList: (
      state: FavoriteState,
      action: PayloadAction<string>
    ) => {
      const removedFavoriteList = state.favoriteList.filter(
        (favorite: ILaptop) => favorite._id !== action.payload
      );
      notification.success({
        message: i18nTranslate("cart:remove_from_favorite"),
        description: i18nTranslate("cart:remove_from_favorite_success")
      });
      return {
        ...state,
        favoriteList: removedFavoriteList
      };
    }
  }
});

export const { addToFavoriteList, removeFromFavoriteList } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
