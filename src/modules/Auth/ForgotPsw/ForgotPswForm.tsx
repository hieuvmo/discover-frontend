import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { IForgotPsw } from "types/auth.model";
import { CommonButton, TextField } from "components";
import { useAppDispatch } from "hooks/useRedux";
import { showLoginFormModal } from "redux/features/auth.slice";
import {
  forgotPswFormSchema,
  initialForgotPswFormValues
} from "./ForgotPsw.constants";
import {
  BackToLoginText,
  ForgotPswDescription,
  ForgotPswTitle,
  UnderConstruction
} from "./ForgotPswForm.styled";

const ForgotPswForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IForgotPsw>({
    mode: "onChange",
    defaultValues: initialForgotPswFormValues,
    resolver: yupResolver(forgotPswFormSchema)
  });

  const handleNavigateToLogin = () => {
    dispatch(showLoginFormModal());
  };

  const onSubmit = (data: IForgotPsw) => {
    console.log("data", data);
  };

  return (
    <>
      <ForgotPswTitle>{t("auth:forgot_psw")}</ForgotPswTitle>

      <ForgotPswDescription>{t("auth:enter_email")}</ForgotPswDescription>

      <UnderConstruction>{t("auth:under_construction")}</UnderConstruction>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                containerClassName="mb-6"
                label={t("auth:email") as string}
                labelRequired
                placeholder={t("auth:email_placeholder") as string}
                errors={errors.email?.message}
              />
            );
          }}
        />

        <CommonButton
          htmlType="submit"
          content={t("auth:forgot_psw")}
          className="w-full"
        />
      </form>

      <BackToLoginText onClick={handleNavigateToLogin}>
        {t("auth:back_to_login")}
      </BackToLoginText>
    </>
  );
};

export default ForgotPswForm;
