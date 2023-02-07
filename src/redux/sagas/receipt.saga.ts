import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  addNewOrderActionComplete,
  addNewOrderActionRequest,
  getOrderByUserIdActionComplete,
  getOrderByUserIdActionRequest
} from "redux/features/receipt.slice";
import { receiptServices } from "services/receipt.service";
import { IReceipt, IReceiptInput, IReceiptResponse } from "types/receipt.model";

function* addNewOrderActionSaga(
  action: PayloadAction<{ data: IReceiptInput; onFinish: () => void }>
) {
  const { data, onFinish } = action.payload;
  try {
    const response: IReceiptResponse = yield call(() =>
      receiptServices.addNewOrder(data)
    );
    yield put(addNewOrderActionComplete({ ...response, success: true }));
    onFinish?.();
  } catch (error) {
    yield put(
      addNewOrderActionComplete({ data: null, message: "", success: true })
    );
  }
}

function* getOrderByUserIdActionSaga(action: PayloadAction<string>) {
  try {
    const response: IReceipt[] = yield call(() =>
      receiptServices.getReceiptById(action.payload)
    );
    yield put(getOrderByUserIdActionComplete(response));
  } catch (error) {
    yield put(getOrderByUserIdActionComplete([]));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(addNewOrderActionRequest.type, addNewOrderActionSaga),
    takeLatest(getOrderByUserIdActionRequest.type, getOrderByUserIdActionSaga)
  ]);
}
