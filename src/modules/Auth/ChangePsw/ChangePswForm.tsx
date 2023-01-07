import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { IChangePsw } from "types/auth.model";
import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { CommonButton, PasswordField } from "components";
import { ProfileTitle } from "modules/Profile/Profile.styled";
import {
  changePswFormSchema,
  initialChangePswFormValues
} from "./ChangePsw.constants";
import { APIErrorMessage } from "./ChangePsw.styled";

const ChangePswForm = () => {
  const { t } = useTranslation();
  const { loading, message, success } = useAppSelector(
    (state: RootState) => state.auth
  );
  const {
    handleSubmit,
    control,
    formState: { errors }
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
    console.log("data", data);
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
        disabled={loading}
      />
    </form>
  );
};

export default ChangePswForm;
