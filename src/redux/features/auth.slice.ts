import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISignUp, ISignUpResponse } from "types/auth.model";

export interface AuthState {
  modalMode: "login" | "sign-up" | "forgot-psw" | null;
  showModal: boolean;
  loading: boolean;
  message: string;
  success: boolean | null;
}

const initialState: AuthState = {
  modalMode: null,
  showModal: false,
  loading: false,
  message: "",
  success: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // handle show auth form
    showLoginFormModal: (state: AuthState): AuthState => ({
      ...state,
      modalMode: "login",
      showModal: true,
      message: "",
      success: null
    }),
    showSignUpFormModal: (state: AuthState): AuthState => ({
      ...state,
      modalMode: "sign-up",
      showModal: true,
      message: "",
      success: null
    }),
    showForgotPswFormModal: (state: AuthState): AuthState => ({
      ...state,
      modalMode: "forgot-psw",
      showModal: true,
      message: "",
      success: null
    }),
    unShowAuthModal: (state: AuthState) => ({
      ...state,
      modalMode: null,
      showModal: false
    }),
    // handle get API
    signUpActionRequest: (
      state: AuthState,
      action: PayloadAction<ISignUp>
    ) => ({
      ...state,
      loading: true
    }),
    signUpActionComplete: (
      state: AuthState,
      action: PayloadAction<ISignUpResponse>
    ) => ({
      ...state,
      loading: false,
      message: action.payload.message,
      success: action.payload.success
    })
  }
});

export const {
  showLoginFormModal,
  showSignUpFormModal,
  showForgotPswFormModal,
  unShowAuthModal,
  signUpActionRequest,
  signUpActionComplete
} = authSlice.actions;

export default authSlice.reducer;
