import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Checkbox, message as messageAntd } from "antd";

import { CommonButton, PasswordField, TextField } from "components";
import { ILogin } from "types/auth.model";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import {
  loginActionRequest,
  showForgotPswFormModal,
  showSignUpFormModal
} from "redux/features/auth.slice";
import { RootState } from "redux/store";
import { initialLoginFormValues, loginFormSchema } from "./Login.constants";
import {
  APIErrorMessage,
  ForgotPswText,
  LoginTitle,
  NotHaveAccount,
  PasswordWrapper,
  RememberPswWrapper
} from "./LoginForm.styled";

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading, message, success } = useAppSelector(
    (state: RootState) => state.auth
  );

  const handleNavigateToAuthModule = (mode: "sign-up" | "forgot-psw") => {
    if (mode === "sign-up") dispatch(showSignUpFormModal());
    else dispatch(showForgotPswFormModal());
  };

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ILogin>({
    mode: "onChange",
    defaultValues: initialLoginFormValues,
    resolver: yupResolver(loginFormSchema)
  });

  const renderErrorMessage = useCallback(() => {
    if (!success) {
      return <APIErrorMessage>{message}</APIErrorMessage>;
    }
    return <div />;
  }, [success, message]);

  const handleSubmitLoginForm = (data: ILogin) => {
    dispatch(loginActionRequest(data));

    if (success) {
      messageAntd.open({
        type: "success",
        content: message
      });
    }
  };

  return (
    <>
      <LoginTitle>{t("auth:log_in")}</LoginTitle>

      <form onSubmit={handleSubmit(handleSubmitLoginForm)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                containerClassName="mb-3"
                label={t("auth:email") as string}
                labelRequired
                placeholder={t("auth:email_placeholder") as string}
                errors={errors.email?.message}
              />
            );
          }}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordField
              {...field}
              containerClassName="mb-3"
              label={t("auth:password") as string}
              labelRequired
              placeholder={t("auth:password_placeholder") as string}
              errors={errors.password?.message}
            />
          )}
        />

        <PasswordWrapper>
          <RememberPswWrapper>
            <Controller
              name="rememberPsw"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox ref={ref} onChange={onChange} checked={value}>
                  {t("auth:remember_psw")}
                </Checkbox>
              )}
            />
          </RememberPswWrapper>
          <ForgotPswText
            onClick={() => handleNavigateToAuthModule("forgot-psw")}
          >
            {t("auth:forgot_psw")}
          </ForgotPswText>
        </PasswordWrapper>

        {renderErrorMessage()}

        <CommonButton
          htmlType="submit"
          content={t("auth:log_in")}
          className="w-full"
          loading={loading}
          disabled={loading}
        />
      </form>

      <NotHaveAccount>
        {t("auth:not_have_account")}
        <span onClick={() => handleNavigateToAuthModule("sign-up")}>
          {t("auth:sign_up")}
        </span>
      </NotHaveAccount>
    </>
  );
};

export default LoginForm;
