import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  signUpActionComplete,
  signUpActionRequest
} from "redux/features/auth.slice";
import { authServices } from "services/auth.service";
import { ISignUp, ISignUpResponse } from "types/auth.model";

function* signUpActionSaga(action: PayloadAction<ISignUp>) {
  try {
    const response: ISignUpResponse = yield call(() =>
      authServices.signUp(action.payload)
    );
    yield put(signUpActionComplete(response));
  } catch (error: any) {
    yield put(
      signUpActionComplete({
        message: error.message,
        success: false
      })
    );
  }
}

export default function* authSaga() {
  yield all([takeLatest(signUpActionRequest.type, signUpActionSaga)]);
}
