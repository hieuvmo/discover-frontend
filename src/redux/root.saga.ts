import { all } from "redux-saga/effects";

import laptopSaga from "./sagas/laptop.saga";

export default function* rootSaga() {
  yield all([laptopSaga()]);
}
