import { notification } from "antd";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  addNewCommentActionComplete,
  addNewCommentActionRequest,
  deleteCommentByIdActionComplete,
  deleteCommentByIdActionRequest,
  getLaptopDetailActionComplete,
  getLaptopDetailActionRequest,
  getLaptopListComplete,
  getLaptopListRequest,
  updateCommentByIdActionComplete,
  updateCommentByIdActionRequest
} from "redux/features/laptop.slice";
import { laptopServices } from "services/laptop.service";
import { ILaptop, ILaptopDetail } from "types/laptop.model";
import { i18nTranslate } from "helpers/language";
import { ICommentInput, ICommentResponse } from "types/comment.model";
import { IUserInfo } from "types/auth.model";
import { IProfile } from "types/profile.model";

function* getLaptopListSaga() {
  try {
    const res: ILaptop[] = yield call(() => laptopServices.getListLaptop());
    yield put(getLaptopListComplete(res));
  } catch (error) {
    yield put(getLaptopListComplete([]));
    notification.error({
      message: i18nTranslate("laptop:laptop_list"),
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

function* addNewCommentActionSaga(
  action: PayloadAction<{
    input: ICommentInput;
    userInfo: IUserInfo;
    profile: IProfile[];
    onFinish: () => void;
  }>
) {
  const { input, userInfo, profile, onFinish } = action.payload;
  try {
    const response: ICommentResponse = yield call(() =>
      laptopServices.addNewComment(input)
    );
    const convertedResponse: ICommentResponse = { ...response, success: true };
    yield put(
      addNewCommentActionComplete({
        response: convertedResponse,
        userInfo,
        profile
      })
    );
    onFinish?.();
    notification.success({
      message: i18nTranslate("laptop:add_new"),
      description: i18nTranslate("laptop:add_new_success")
    });
  } catch (error) {
    const convertedResponse: ICommentResponse = {
      data: null,
      message: "",
      success: false
    };
    yield put(
      addNewCommentActionComplete({
        response: convertedResponse,
        userInfo,
        profile
      })
    );
    notification.error({
      message: i18nTranslate("laptop:add_new"),
      description: i18nTranslate("laptop:add_new_failure")
    });
  }
}

function* deleteCommentByIdActionSaga(
  action: PayloadAction<{
    userId: string;
    commentId: string;
    onFinish: () => void;
  }>
) {
  const { userId, commentId, onFinish } = action.payload;

  try {
    const response: ICommentResponse = yield call(() =>
      laptopServices.deleteCommentById(userId, commentId)
    );
    yield put(deleteCommentByIdActionComplete({ ...response, success: true }));
    onFinish?.();
    notification.success({
      message: i18nTranslate("laptop:delete_comment"),
      description: i18nTranslate("laptop:delete_comment_success")
    });
  } catch (error) {
    yield put(
      deleteCommentByIdActionComplete({
        data: null,
        message: "",
        success: false
      })
    );
    notification.error({
      message: i18nTranslate("laptop:delete_comment"),
      description: i18nTranslate("laptop:delete_comment_failure")
    });
  }
}

function* updateCommentByIdActionSaga(
  action: PayloadAction<{
    input: ICommentInput;
    commentId: string;
    onFinish: () => void;
  }>
) {
  const { input, commentId, onFinish } = action.payload;

  try {
    const response: ICommentResponse = yield call(() =>
      laptopServices.updateCommentById(input, commentId)
    );
    yield put(updateCommentByIdActionComplete({ ...response, success: true }));
    onFinish?.();
    notification.success({
      message: i18nTranslate("laptop:edit_comment"),
      description: i18nTranslate("laptop:edit_comment_success")
    });
  } catch (error) {
    yield put(
      updateCommentByIdActionComplete({
        data: null,
        message: "",
        success: false
      })
    );
    notification.error({
      message: i18nTranslate("laptop:edit_comment"),
      description: i18nTranslate("laptop:edit_comment_failure")
    });
  }
}

export default function* laptopSaga() {
  yield all([
    takeLatest(getLaptopListRequest.type, getLaptopListSaga),
    takeLatest(getLaptopDetailActionRequest.type, getLaptopDetailActionSaga),
    takeLatest(addNewCommentActionRequest.type, addNewCommentActionSaga),
    takeLatest(
      updateCommentByIdActionRequest.type,
      updateCommentByIdActionSaga
    ),
    takeLatest(deleteCommentByIdActionRequest.type, deleteCommentByIdActionSaga)
  ]);
}
