import { notification } from "antd";
import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  getLaptopDetailActionComplete,
  getLaptopDetailActionRequest,
  getLaptopListComplete,
  getLaptopListRequest
} from "redux/features/laptop.slice";
import { laptopServices } from "services/laptop.service";
import { ILaptop, ILaptopDetail } from "types/laptop.model";
import { i18nTranslate } from "helpers/language";
import { PayloadAction } from "@reduxjs/toolkit";

function* getLaptopListSaga() {
  try {
    const res: ILaptop[] = yield call(() => laptopServices.getListLaptop());
    yield put(getLaptopListComplete(res));
  } catch (error) {
    yield put(getLaptopListComplete([]));
    notification.error({
      message: i18nTranslate("laptop:laptop_list_error"),
      description: i18nTranslate("laptop:laptop_list_error")
    });
  }
}

function* getLaptopDetailActionSaga(action: PayloadAction<string>) {
  try {
    const response: ILaptopDetail = yield call(() =>
      laptopServices.getLaptopDetail(action.payload)
    );
    yield put(getLaptopDetailActionComplete(response));
  } catch (error) {
    yield put(getLaptopDetailActionComplete({ laptop: null, comments: [] }));
  }
}

export default function* laptopSaga() {
  yield all([
    takeLatest(getLaptopListRequest.type, getLaptopListSaga),
    takeLatest(getLaptopDetailActionRequest.type, getLaptopDetailActionSaga)
  ]);
}
