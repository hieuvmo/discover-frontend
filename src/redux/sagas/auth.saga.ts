import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { message, notification } from "antd";

import { i18nTranslate } from "helpers/language";
import {
  changePswActionComplete,
  changePswActionRequest,
  loginActionComplete,
  loginActionRequest,
  logoutActionComplete,
  logoutActionRequest,
  resetAuthForm,
  signUpActionComplete,
  signUpActionRequest,
  unShowAuthModal,
  updateProfileActionComplete,
  updateProfileActionRequest
} from "redux/features/auth.slice";
import { authServices } from "services/auth.service";
import {
  IChangePsw,
  IChangePswResponse,
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
import { destroyAllLocalStorageItem } from "helpers/storage";
import {
  IPersonalAddress,
  IPersonalAvatar,
  IPersonalInfo,
  IProfileResponse
} from "types/profile.model";
import { profileServices } from "services/profile.service";

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
    yield put(resetAuthForm());
    yield put(unShowAuthModal());
    setRefreshTokenToCookie(response.refreshToken);
    setAccessTokenToCookie(response.accessToken);
    message.open({
      type: "success",
      content: i18nTranslate("auth:success_login")
    });
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
    yield put(resetAuthForm());
    destroyAllLocalStorageItem();
    removeAccessTokenFromCookie();
    removeRefreshTokenFromCookie();
    message.open({
      type: "success",
      content: i18nTranslate("auth:logout_success")
    });
  } catch (error: any) {
    yield put(
      logoutActionComplete({
        message: i18nTranslate("auth:not_existed_email"),
        success: false
      })
    );
  }
}

function* changePswActionSaga(
  action: PayloadAction<{ params: IChangePsw; onFinish: () => void }>
) {
  const { params, onFinish } = action.payload;

  try {
    const response: IChangePswResponse = yield call(() =>
      authServices.changePassword(params)
    );
    yield put(
      changePswActionComplete({
        ...response,
        message: i18nTranslate("auth:change_psw_success"),
        success: true
      })
    );
    yield put(resetAuthForm());
    destroyAllLocalStorageItem();
    removeAccessTokenFromCookie();
    removeRefreshTokenFromCookie();
    onFinish?.();
    notification.success({
      message: i18nTranslate("auth:change_psw"),
      description: i18nTranslate("auth:change_psw_success")
    });
  } catch (error) {
    yield put(
      changePswActionComplete({
        message: i18nTranslate("auth:wrong_old_psw"),
        success: false
      })
    );
    notification.error({
      message: i18nTranslate("auth:change_psw"),
      description: i18nTranslate("auth:wrong_old_psw")
    });
  }
}

function* updateProfileActionSaga(
  action: PayloadAction<{
    params: IPersonalInfo | IPersonalAddress | IPersonalAvatar;
    userId: string;
    onFinish: () => void;
  }>
) {
  const { params, userId, onFinish } = action.payload;

  try {
    const response: IProfileResponse = yield call(() =>
      profileServices.updateProfile(params, userId)
    );
    yield put(
      updateProfileActionComplete({
        ...response,
        message: i18nTranslate("profile:update_profile_success"),
        success: true
      })
    );
    yield put(resetAuthForm());
    onFinish?.();
    notification.success({
      message: i18nTranslate("profile:update_profile"),
      description: i18nTranslate("profile:update_profile_success")
    });
  } catch (error) {
    yield put(
      updateProfileActionComplete({
        message: i18nTranslate("profile:update_profile_failure"),
        success: false,
        data: null
      })
    );
    notification.error({
      message: i18nTranslate("profile:update_profile"),
      description: i18nTranslate("profile:update_profile_failure")
    });
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(signUpActionRequest.type, signUpActionSaga),
    takeLatest(loginActionRequest.type, loginActionSaga),
    takeLatest(logoutActionRequest.type, logoutActionSaga),
    takeLatest(changePswActionRequest.type, changePswActionSaga),
    takeLatest(updateProfileActionRequest.type, updateProfileActionSaga)
  ]);
}
