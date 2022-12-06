import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  getLaptopListComplete,
  getLaptopListRequest
} from "redux/features/laptop.slice";
import { laptopServices } from "services/laptop.service";
import { ILaptop } from "types/laptop.model";

function* getLaptopListSaga() {
  try {
    const res: ILaptop[] = yield call(() => laptopServices.getListLaptop());
    yield put(getLaptopListComplete(res));
  } catch (error) {
    yield put(getLaptopListComplete([]));
  }
}

export default function* laptopSaga() {
  yield all([takeLatest(getLaptopListRequest.type, getLaptopListSaga)]);
}
