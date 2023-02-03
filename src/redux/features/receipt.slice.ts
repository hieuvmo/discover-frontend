import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IReceiptInput, IReceiptResponse } from "types/receipt.model";

export interface ReceiptState {
  modalType: "cart" | "checkout" | "done";
  openModal: boolean;
  receptItem: IReceiptInput | null;
  success: boolean;
  message: string;
  loading: boolean;
}

const initialState: ReceiptState = {
  modalType: "cart",
  openModal: false,
  receptItem: null,
  success: false,
  message: "",
  loading: false
};

export const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {
    resetReceiptModal: (state: ReceiptState): ReceiptState => ({
      ...state,
      modalType: "cart",
      openModal: false
    }),
    navigateToCartModal: (state: ReceiptState): ReceiptState => ({
      ...state,
      modalType: "cart",
      openModal: true
    }),
    navigateToCheckoutModal: (state: ReceiptState): ReceiptState => ({
      ...state,
      modalType: "checkout",
      openModal: true
    }),
    navigateToOrderDoneModal: (state: ReceiptState): ReceiptState => ({
      ...state,
      modalType: "done",
      openModal: true
    }),
    addNewOrderActionRequest: (
      state: ReceiptState,
      action: PayloadAction<{ data: IReceiptInput; onFinish: () => void }>
    ) => ({
      ...state,
      loading: true
    }),
    addNewOrderActionComplete: (
      state: ReceiptState,
      action: PayloadAction<IReceiptResponse | null>
    ) => ({
      ...state,
      loading: false,
      receptItem: action.payload?.data || null,
      success: action.payload?.success || false,
      message: action.payload?.message || ""
    })
  }
});

export const {
  resetReceiptModal,
  navigateToCartModal,
  navigateToCheckoutModal,
  navigateToOrderDoneModal,
  addNewOrderActionRequest,
  addNewOrderActionComplete
} = receiptSlice.actions;

export default receiptSlice.reducer;
