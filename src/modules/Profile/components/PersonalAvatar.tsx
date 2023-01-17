import { ChangeEvent } from "react";
import { Button, Skeleton, notification } from "antd";
import { useTranslation } from "react-i18next";

import { CameraIcon } from "icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import {
  resetAfterChangeAvatar,
  uploadImageActionRequest
} from "redux/features/profile.slice";
import { updateProfileActionRequest } from "redux/features/auth.slice";
import { IPersonalAvatar } from "types/profile.model";
import { ProfileAvatar, UploadFileAvatar } from "../Profile.styled";

const PersonalAvatar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { profile, userInfo } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { uploadedImg, uploadedLoading } = useAppSelector(
    (state: RootState) => state.profile
  );

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // check image size > 3MB
      if (file.size / 1024 / 1024 > 3) {
        return notification.error({
          message: t("profile:update_avatar"),
          description: t("profile:upload_size_err")
        });
      }
      // check image format
      if (!file.type.includes("image")) {
        return notification.error({
          message: t("profile:update_avatar"),
          description: t("profile:invalid_img_err")
        });
      }

      const formData = new FormData();
      formData.append("avatar", file);
      dispatch(uploadImageActionRequest(formData));
    }
  };

  const handleChangeAvatar = () => {
    const avatarUrl: IPersonalAvatar = {
      avatar: uploadedImg
    };

    dispatch(
      updateProfileActionRequest({
        params: avatarUrl,
        userId: `${userInfo?._id}`,
        onFinish() {
          dispatch(resetAfterChangeAvatar());
        }
      })
    );
  };

  return (
    <>
      <ProfileAvatar>
        {uploadedLoading ? (
          <Skeleton.Image
            active
            style={{ width: "15rem", height: "15rem", borderRadius: "50%" }}
          />
        ) : (
          <img
            src={uploadedImg || profile?.avatar}
            alt={profile?.lastName}
            className="rounded-[50%] w-full h-full object-cover"
          />
        )}
        <UploadFileAvatar>
          <CameraIcon fill="#fff" className="m-auto h-10 w-4" />
          <input type="file" className="hidden" onChange={handleUploadImage} />
        </UploadFileAvatar>
      </ProfileAvatar>
      {uploadedImg && (
        <Button
          className="my-4 mx-auto border-black flex"
          onClick={handleChangeAvatar}
        >
          {t("profile:update_avatar")}
        </Button>
      )}
    </>
  );
};

export default PersonalAvatar;
