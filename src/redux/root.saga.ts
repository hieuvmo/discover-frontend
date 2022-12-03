import { all } from "redux-saga/effects";

import counterSaga from "./sagas/couter.saga";

export default function* rootSaga() {
  yield all([counterSaga()]);
}
