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
    showLoginFormModal: (state: AuthState) => {
      state.modalMode = "login";
      state.showModal = true;
    },
    showSignUpFormModal: (state: AuthState) => {
      state.modalMode = "sign-up";
      state.showModal = true;
    },
    showForgotPswFormModal: (state: AuthState) => {
      state.modalMode = "forgot-psw";
      state.showModal = true;
    },
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
