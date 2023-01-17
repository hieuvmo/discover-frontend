import { PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { i18nTranslate } from "helpers/language";

// TODO: All should import from saga not axios => oke bro
import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  getDistrictActionComplete,
  getDistrictActionRequest,
  getProvinceActionComplete,
  getProvinceActionRequest,
  getWardActionComplete,
  getWardActionRequest,
  uploadImageActionComplete,
  uploadImageActionRequest
} from "redux/features/profile.slice";

import { profileServices } from "services/profile.service";
import { IDistrict, IProvince, IWard } from "types/profile.model";

function* getProvinceActionSaga() {
  try {
    const response: IProvince[] = yield call(() =>
      profileServices.getAllProvince()
    );
    yield put(getProvinceActionComplete(response));
  } catch (error) {
    yield put(getProvinceActionComplete([]));
  }
}

function* getDistrictActionSaga(action: PayloadAction<string>) {
  try {
    const response: IDistrict[] = yield call(() =>
      profileServices.getDistrictByProvinceId(action.payload)
    );
    yield put(getDistrictActionComplete(response));
  } catch (error) {
    yield put(getDistrictActionComplete([]));
  }
}

function* getWardActionSaga(action: PayloadAction<string>) {
  try {
    const response: IWard[] = yield call(() =>
      profileServices.getWardByDistrictId(action.payload)
    );
    yield put(getWardActionComplete(response));
  } catch (error) {
    yield put(getWardActionComplete([]));
  }
}

function* uploadAvatarActionSaga(action: PayloadAction<FormData>) {
  try {
    const url: string = yield call(() =>
      profileServices.uploadAvatar(action.payload)
    );
    yield put(uploadImageActionComplete(url));
  } catch (error) {
    yield notification.error({
      message: i18nTranslate("profile:update_avatar"),
      description: i18nTranslate("profile:upload_avatar_err")
    });
  }
}

export default function* profileSaga() {
  yield all([
    takeLatest(getProvinceActionRequest.type, getProvinceActionSaga),
    takeLatest(getDistrictActionRequest.type, getDistrictActionSaga),
    takeLatest(getWardActionRequest.type, getWardActionSaga),
    takeLatest(uploadImageActionRequest.type, uploadAvatarActionSaga)
  ]);
}
