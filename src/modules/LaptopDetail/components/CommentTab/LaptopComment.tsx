import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Rate,
  Typography,
  Input,
  Divider,
  Pagination,
  notification
} from "antd";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CommonButton } from "components";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { IComment, ICommentInput } from "types/comment.model";
import {
  addNewCommentActionRequest,
  resetComment,
  setNullCommentItem,
  updateCommentByIdActionRequest
} from "redux/features/laptop.slice";
import { IProfile } from "types/profile.model";
import {
  CommentList,
  StarEvaluation,
  SubmitCommentButton
} from "./CommentTab.styled";
import CommentCard from "./CommentCard";

const { TextArea } = Input;
const { Title } = Typography;

const LaptopComment = () => {
  const { t } = useTranslation();
  const [pageNum, setPageNum] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { commentList, commentItem, laptopDetail, loading } = useAppSelector(
    (state: RootState) => state.laptop
  );
  const { userInfo, profile } = useAppSelector(
    (state: RootState) => state.auth
  );

  const handleChangePageNum = (page: number) => {
    setPageNum(page);
  };

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isValid }
  } = useForm<ICommentInput>({
    mode: "onChange",
    defaultValues: {
      laptopId: laptopDetail?._id,
      userId: userInfo?._id,
      updatedAt: `${Date.now()}`,
      rating: 5,
      comment: ""
    },
    resolver: yupResolver(
      Yup.object().shape({
        comment: Yup.string().required(`${t("auth:is_required")}`)
      })
    )
  });

  const handleSubmitCommentForm = (data: ICommentInput) => {
    if (!userInfo || !profile) {
      return notification.error({
        message: t("laptop:add_new"),
        description: t("laptop:login_to_use")
      });
    }
    // add new
    if (!commentItem) {
      const convertedProfile: IProfile[] = [{ ...profile }];
      return dispatch(
        addNewCommentActionRequest({
          input: { ...data, updatedAt: `${Date.now()}` },
          userInfo,
          profile: convertedProfile,
          onFinish() {
            dispatch(resetComment());
            reset({ ...getValues(), rating: 5, comment: "" });
          }
        })
      );
    }
    // edit
    dispatch(
      updateCommentByIdActionRequest({
        input: { ...data, updatedAt: Date.now().toString() },
        commentId: commentItem._id,
        onFinish() {
          dispatch(setNullCommentItem());
          dispatch(resetComment());
          reset({ ...getValues(), rating: 5, comment: "" });
        }
      })
    );
  };

  useEffect(() => {
    if (commentItem) {
      reset({
        laptopId: commentItem.laptopId,
        userId: commentItem.userId._id,
        updatedAt: commentItem.updatedAt,
        rating: commentItem.rating,
        comment: commentItem.comment
      });
    }
  }, [commentItem, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitCommentForm)}>
        <StarEvaluation>
          <Title level={5}>{t("laptop:rating")}</Title>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => {
              return <Rate {...field} />;
            }}
          />
        </StarEvaluation>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => {
            return <TextArea {...field} rows={4} />;
          }}
        />
        <SubmitCommentButton>
          <Title level={5}>{errors.comment?.message}</Title>

          <CommonButton
            htmlType="submit"
            content={commentItem ? t("laptop:edit") : t("laptop:comment")}
            loading={loading}
            disabled={loading || !isValid}
          />
        </SubmitCommentButton>
        <Divider className="my-4" />
      </form>
      {commentList.length ? (
        <CommentList>
          {[...commentList]
            .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
            .slice((pageNum - 1) * 5, pageNum * 5)
            .map((comment: IComment) => (
              <CommentCard
                key={comment._id}
                commentId={comment._id}
                userId={comment.userId._id}
                avatar={comment.userProfile[0].avatar}
                fullName={`${comment.userProfile[0].lastName} ${comment.userProfile[0].firstName}`}
                comment={comment.comment}
                rating={comment.rating}
                updatedAt={comment.updatedAt}
              />
            ))}

          <Pagination
            current={pageNum}
            total={commentList.length}
            onChange={handleChangePageNum}
            defaultPageSize={5}
          />
        </CommentList>
      ) : (
        <div />
      )}
    </>
  );
};

export default LaptopComment;
