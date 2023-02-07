import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IReceipt, IReceiptInput, IReceiptResponse } from "types/receipt.model";

export interface ReceiptState {
  modalType: "cart" | "checkout" | "done";
  openModal: boolean;
  receiptItem: IReceiptInput | null;
  receiptList: IReceipt[];
  success: boolean;
  message: string;
  loading: boolean;
}

const initialState: ReceiptState = {
  modalType: "cart",
  openModal: false,
  receiptItem: null,
  receiptList: [],
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
      receiptItem: action.payload?.data || null,
      success: action.payload?.success || false,
      message: action.payload?.message || ""
    }),
    getOrderByUserIdActionRequest: (
      state: ReceiptState,
      action: PayloadAction<string>
    ) => ({
      ...state,
      loading: true
    }),
    getOrderByUserIdActionComplete: (
      state: ReceiptState,
      action: PayloadAction<IReceipt[]>
    ) => ({
      ...state,
      loading: false,
      receiptList: action.payload
    })
  }
});

export const {
  resetReceiptModal,
  navigateToCartModal,
  navigateToCheckoutModal,
  navigateToOrderDoneModal,
  addNewOrderActionRequest,
  addNewOrderActionComplete,
  getOrderByUserIdActionRequest,
  getOrderByUserIdActionComplete
} = receiptSlice.actions;

export default receiptSlice.reducer;
