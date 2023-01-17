import { Divider, Dropdown, MenuProps, Rate, Typography } from "antd";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { MenuDotsIcon, PencilIcon, TrashIcon } from "icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import {
  deleteCommentByIdActionRequest,
  resetComment,
  setCommentItem
} from "redux/features/laptop.slice";
import { IComment } from "types/comment.model";
import {
  CommentItem,
  CommentItemDescription,
  UserCommentInfo
} from "./CommentTab.styled";

const { Text, Title } = Typography;

interface CommentCardProps {
  commentId: string;
  userId: string;
  avatar: string;
  fullName: string;
  comment: string;
  rating: number;
  updatedAt: string;
}

const CommentCard = ({
  commentId,
  userId,
  avatar,
  fullName,
  comment,
  rating,
  updatedAt
}: CommentCardProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const { commentList } = useAppSelector((state: RootState) => state.laptop);

  const handleClickUpdateComment = (selectedCommentId: string) => {
    const selectedComment = commentList.filter(
      (commentItem: IComment) => commentItem._id === selectedCommentId
    )[0];
    dispatch(setCommentItem(selectedComment));
  };

  const handleClickDeleteComment = (selectedCommentId: string) => {
    dispatch(
      deleteCommentByIdActionRequest({
        userId: `${userInfo?._id}`,
        commentId: selectedCommentId,
        onFinish() {
          dispatch(resetComment());
        }
      })
    );
  };

  const crudList: MenuProps["items"] = [
    {
      key: String(t("laptop:add_to_cart")),
      label: (
        <div onClick={() => handleClickUpdateComment(commentId)}>
          {t("laptop:edit")}
        </div>
      ),
      icon: <PencilIcon width={14} />
    },
    {
      key: String(t("laptop:add_to_favorite")),
      label: (
        <div onClick={() => handleClickDeleteComment(commentId)}>
          {t("laptop:delete")}
        </div>
      ),
      icon: <TrashIcon width={14} />
    }
  ];

  return (
    <>
      <CommentItem>
        <img src={avatar} alt={avatar} />
        <CommentItemDescription>
          <UserCommentInfo>
            <Rate disabled value={rating} />
            {userId === userInfo?._id && (
              <Dropdown
                menu={{ items: crudList }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <MenuDotsIcon className="w-3.5 h-3.5 cursor-pointer" />
              </Dropdown>
            )}
          </UserCommentInfo>
          <Title level={5} className="text-sm">
            {comment}
          </Title>
          <UserCommentInfo>
            <Title level={5} className="text-sm">
              {fullName}
            </Title>
            <Text className="text-xs">
              {moment(updatedAt).format("YYYY/MM/DD hh:mm:ss")}
            </Text>
          </UserCommentInfo>
        </CommentItemDescription>
      </CommentItem>
      <Divider className="my-4" />
    </>
  );
};

export default CommentCard;
