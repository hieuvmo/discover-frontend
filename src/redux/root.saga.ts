import { all } from "redux-saga/effects";

import laptopSaga from "./sagas/laptop.saga";
import authSaga from "./sagas/auth.saga";

export default function* rootSaga() {
  yield all([authSaga(), laptopSaga()]);
}
