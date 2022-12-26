import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ILogin,
  ILoginResponse,
  ILogoutResponse,
  IProfile,
  ISignUp,
  ISignUpResponse,
  IUserInfo
} from "types/auth.model";

export interface AuthState {
  modalMode: "login" | "sign-up" | "forgot-psw" | null;
  showModal: boolean;
  loading: boolean;
  message: string;
  success: boolean | null;
  userInfo: IUserInfo | null;
  profile: IProfile | null;
}

const initialState: AuthState = {
  modalMode: null,
  showModal: false,
  loading: false,
  message: "",
  success: null,
  userInfo: null,
  profile: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reset form
    resetAuthForm: (state: AuthState) => ({
      ...state,
      message: "",
      success: null
    }),
    resetLoginData: (state: AuthState) => ({
      ...state,
      userInfo: null,
      profile: null
    }),
    // handle show auth form
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
    }),
    loginActionRequest: (state: AuthState, action: PayloadAction<ILogin>) => ({
      ...state,
      loading: true
    }),
    loginActionComplete: (
      state: AuthState,
      action: PayloadAction<ILoginResponse>
    ) => ({
      ...state,
      loading: false,
      message: action.payload.message,
      success: action.payload.success,
      userInfo: action.payload.data.userInfo,
      profile: action.payload.data.profile
    }),
    logoutActionRequest: (state: AuthState) => ({
      ...state,
      loading: true
    }),
    logoutActionComplete: (
      state: AuthState,
      action: PayloadAction<ILogoutResponse>
    ) => ({
      ...state,
      loading: false,
      success: action.payload.success,
      message: action.payload.message,
      userInfo: action.payload.success ? null : state.userInfo,
      profile: action.payload.success ? null : state.profile
    })
  }
});

export const {
  resetAuthForm,
  resetLoginData,
  showLoginFormModal,
  showSignUpFormModal,
  showForgotPswFormModal,
  unShowAuthModal,
  signUpActionRequest,
  signUpActionComplete,
  loginActionRequest,
  loginActionComplete,
  logoutActionRequest,
  logoutActionComplete
} = authSlice.actions;

export default authSlice.reducer;
