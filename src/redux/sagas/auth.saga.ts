import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { message } from "antd";

import { i18nTranslate } from "helpers/language";
import {
  loginActionComplete,
  loginActionRequest,
  logoutActionComplete,
  logoutActionRequest,
  resetAuthForm,
  signUpActionComplete,
  signUpActionRequest,
  unShowAuthModal
} from "redux/features/auth.slice";
import { authServices } from "services/auth.service";
import {
  ILogin,
  ILoginResponse,
  ILogoutResponse,
  ISignUp,
  ISignUpResponse
} from "types/auth.model";
import {
  removeAccessTokenFromCookie,
  removeRefreshTokenFromCookie,
  setAccessTokenToCookie,
  setRefreshTokenToCookie
} from "helpers/token";

function* signUpActionSaga(action: PayloadAction<ISignUp>) {
  try {
    const response: ISignUpResponse = yield call(() =>
      authServices.signUp(action.payload)
    );
    yield put(
      signUpActionComplete({
        ...response,
        message: i18nTranslate("auth:success_register")
      })
    );
  } catch (error: any) {
    yield put(
      signUpActionComplete({
        message: i18nTranslate("auth:existed_email"),
        success: false
      })
    );
  }
}

function* loginActionSaga(action: PayloadAction<ILogin>) {
  const { email, password } = action.payload;
  try {
    const response: ILoginResponse = yield call(() =>
      authServices.login({ email, password })
    );
    yield put(
      loginActionComplete({
        ...response,
        success: true,
        message: i18nTranslate("auth:success_login")
      })
    );
    yield message.open({
      type: "success",
      content: i18nTranslate("auth:success_login")
    });
    yield put(resetAuthForm());
    yield put(unShowAuthModal());
    setAccessTokenToCookie(response.accessToken);
    setRefreshTokenToCookie(response.refreshToken);
  } catch (error: any) {
    yield put(
      loginActionComplete({
        success: false,
        message:
          error.message === "Sai tài khoản hoặc mật khẩu"
            ? i18nTranslate("auth:wrong_psw")
            : i18nTranslate("auth:not_existed_email"),
        accessToken: "",
        refreshToken: "",
        data: {
          profile: null,
          userInfo: null
        }
      })
    );
  }
}

function* logoutActionSaga() {
  try {
    const response: ILogoutResponse = yield call(() => authServices.logout());
    yield put(
      logoutActionComplete({
        ...response,
        message: i18nTranslate("auth:logout_success"),
        success: true
      })
    );
    yield message.open({
      type: "success",
      content: i18nTranslate("auth:logout_success")
    });
    yield put(resetAuthForm());
    removeAccessTokenFromCookie();
    removeRefreshTokenFromCookie();
  } catch (error: any) {
    yield put(
      logoutActionComplete({
        message: i18nTranslate("auth:not_existed_email"),
        success: false
      })
    );
  }
}

export default function* authSaga() {
  yield all([takeLatest(signUpActionRequest.type, signUpActionSaga)]);
  yield all([takeLatest(loginActionRequest.type, loginActionSaga)]);
  yield all([takeLatest(logoutActionRequest.type, logoutActionSaga)]);
}
