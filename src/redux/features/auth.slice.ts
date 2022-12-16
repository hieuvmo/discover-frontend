import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  modalMode: "login" | "sign-up" | "forgot-psw" | null;
  showModal: boolean;
}

const initialState: AuthState = {
  modalMode: null,
  showModal: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showLoginFormModal: (state: AuthState): AuthState => ({
      ...state,
      modalMode: "login",
      showModal: true
    }),
    showSignUpFormModal: (state: AuthState): AuthState => ({
      ...state,
      modalMode: "sign-up",
      showModal: true
    }),
    showForgotPswFormModal: (state: AuthState): AuthState => ({
      ...state,
      modalMode: "forgot-psw",
      showModal: true
    }),
    unShowAuthModal: (state: AuthState) => ({
      ...state,
      modalMode: null,
      showModal: false
    })
  }
});

export const {
  showLoginFormModal,
  showSignUpFormModal,
  showForgotPswFormModal,
  unShowAuthModal
} = authSlice.actions;

export default authSlice.reducer;
