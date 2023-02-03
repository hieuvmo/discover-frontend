import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { i18nTranslate } from "helpers/language";
import { ICart } from "types/cart.model";
import { ILaptop } from "types/laptop.model";

export interface CartState {
  cartList: ICart[];
}

const initialState: CartState = {
  cartList: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state: CartState) => ({ ...state, cartList: [] }),
    addToCart: (state: CartState, action: PayloadAction<ILaptop>) => {
      let increasedQuantity: boolean = false;
      const addedCartList = state.cartList.map((cart: ICart) => {
        if (cart.laptop._id === action.payload._id) {
          increasedQuantity = true;
          return {
            laptop: cart.laptop,
            quantity: cart.quantity + 1
          };
        }
        return cart;
      });

      if (increasedQuantity) {
        notification.success({
          message: i18nTranslate("cart:add_to_cart"),
          description: i18nTranslate("cart:increase_quantity_cart")
        });
        return { ...state, cartList: addedCartList };
      }
      notification.success({
        message: i18nTranslate("cart:add_to_cart"),
        description: i18nTranslate("cart:add_to_cart_success")
      });
      return {
        ...state,
        cartList: [...state.cartList, { laptop: action.payload, quantity: 1 }]
      };
    },

    increaseLaptopQuantity: (
      state: CartState,
      action: PayloadAction<string>
    ) => {
      const increasedCartList = state.cartList.map((cart: ICart) => {
        if (cart.laptop._id === action.payload) {
          return {
            laptop: cart.laptop,
            quantity: cart.quantity + 1
          };
        }
        return cart;
      });
      return { ...state, cartList: increasedCartList };
    },
    decreaseLaptopQuantity: (
      state: CartState,
      action: PayloadAction<string>
    ) => {
      const decreasedCartList = state.cartList.map((cart: ICart) => {
        if (cart.laptop._id === action.payload) {
          return {
            laptop: cart.laptop,
            quantity: cart.quantity === 1 ? cart.quantity : cart.quantity - 1
          };
        }
        return cart;
      });
      return { ...state, cartList: decreasedCartList };
    },
    removeLaptopItemInCart: (
      state: CartState,
      action: PayloadAction<string>
    ) => {
      const deletedCartList = state.cartList.filter(
        (cart: ICart) => cart.laptop._id !== action.payload
      );
      notification.success({
        message: i18nTranslate("cart:remove_from_cart"),
        description: i18nTranslate("cart:remove_from_cart_success")
      });
      return {
        ...state,
        cartList: deletedCartList
      };
    }
  }
});

export const {
  resetCart,
  addToCart,
  increaseLaptopQuantity,
  decreaseLaptopQuantity,
  removeLaptopItemInCart
} = cartSlice.actions;

export default cartSlice.reducer;
