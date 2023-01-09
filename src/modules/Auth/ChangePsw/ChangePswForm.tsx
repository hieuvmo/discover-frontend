import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { IChangePsw } from "types/auth.model";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { CommonButton, PasswordField } from "components";
import { ProfileTitle } from "modules/Profile/Profile.styled";
import { changePswActionRequest } from "redux/features/auth.slice";
import { routerPaths } from "routers/router.paths";
import {
  changePswFormSchema,
  initialChangePswFormValues
} from "./ChangePsw.constants";
import { APIErrorMessage } from "./ChangePsw.styled";

const ChangePswForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, message, success, userInfo } = useAppSelector(
    (state: RootState) => state.auth
  );
  const {
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<IChangePsw>({
    mode: "onChange",
    defaultValues: initialChangePswFormValues,
    resolver: yupResolver(changePswFormSchema)
  });

  const renderErrorMessage = useCallback(() => {
    if (!success) {
      return <APIErrorMessage>{message}</APIErrorMessage>;
    }
    return <div />;
  }, [success, message]);

  const handleSubmitChangePswForm = (data: IChangePsw) => {
    const inputData: IChangePsw = {
      userId: userInfo?._id,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    };
    dispatch(
      changePswActionRequest({
        params: inputData,
        onFinish() {
          navigate(routerPaths.HOME);
        }
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitChangePswForm)}>
      <ProfileTitle>{t("profile:change_psw")}</ProfileTitle>

      <Controller
        name="oldPassword"
        control={control}
        render={({ field }) => {
          return (
            <PasswordField
              {...field}
              containerClassName="mb-4"
              label={t("auth:old_psw") as string}
              labelRequired
              placeholder={t("auth:old_psw_placeholder") as string}
              errors={errors.oldPassword?.message}
            />
          );
        }}
      />

      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <PasswordField
            {...field}
            containerClassName="mb-4"
            label={t("auth:new_psw") as string}
            labelRequired
            placeholder={t("auth:new_psw_placeholder") as string}
            errors={errors.newPassword?.message}
          />
        )}
      />

      <Controller
        name="confirmNewPsw"
        control={control}
        render={({ field }) => (
          <PasswordField
            {...field}
            containerClassName="mb-4"
            label={t("auth:confirm_psw") as string}
            labelRequired
            placeholder={t("auth:confirm_psw_placeholder") as string}
            errors={errors.confirmNewPsw?.message}
          />
        )}
      />

      {renderErrorMessage()}

      <CommonButton
        htmlType="submit"
        content={t("auth:change_psw")}
        className="w-full"
        loading={loading}
        disabled={loading || !isValid}
      />
    </form>
  );
};

export default ChangePswForm;
