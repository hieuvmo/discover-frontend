import { useCallback, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton, PasswordField, TextField } from "components";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";

import {
  showLoginFormModal,
  signUpActionRequest,
  resetAuthForm
} from "redux/features/auth.slice";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { ISignUp } from "types/auth.model";
import { RootState } from "redux/store";
import { initialSignUpFormValues, signUpFormSchema } from "./SignUp.constants";
import {
  APIErrorMessage,
  FullNameWrapper,
  HaveAccount,
  SignUpTitle
} from "./SignUpForm.styled";

const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading, message, success } = useAppSelector(
    (state: RootState) => state.auth
  );

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ISignUp>({
    mode: "onChange",
    defaultValues: initialSignUpFormValues,
    resolver: yupResolver(signUpFormSchema)
  });

  const handleNavigateToLogin = useCallback(() => {
    dispatch(showLoginFormModal());
  }, [dispatch]);

  const popUpSuccessfulSignUp = useCallback(() => {
    const modal = Modal.success({
      title: t("auth:sign_up"),
      content: message,
      okText: t("auth:navigate_to_login"),
      onOk: handleNavigateToLogin
    });

    setTimeout(() => {
      modal.destroy();
      handleNavigateToLogin();
    }, 5000);
  }, [handleNavigateToLogin, message, t]);

  const renderErrorMessage = useCallback(() => {
    if (!success) {
      return <APIErrorMessage>{message}</APIErrorMessage>;
    }
    return <div />;
  }, [success, message]);

  const handleSubmitSignUpForm = useCallback(
    (data: ISignUp) => {
      const newData: ISignUp = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      };
      dispatch(signUpActionRequest(newData));
    },
    [dispatch]
  );

  useEffect(() => {
    if (success) popUpSuccessfulSignUp();

    return () => {
      dispatch(resetAuthForm());
    };
  }, [dispatch, popUpSuccessfulSignUp, success]);

  return (
    <>
      <SignUpTitle>{t("auth:sign_up")}</SignUpTitle>

      <form onSubmit={handleSubmit(handleSubmitSignUpForm)}>
        <FullNameWrapper>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  containerClassName="w-1/2"
                  label={t("auth:last_name") as string}
                  placeholder={t("auth:last_name_placeholder") as string}
                />
              );
            }}
          />
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  containerClassName="w-1/2"
                  label={t("auth:first_name") as string}
                  placeholder={t("auth:first_name_placeholder") as string}
                />
              );
            }}
          />
        </FullNameWrapper>

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

        <Controller
          name="confirmPsw"
          control={control}
          render={({ field }) => (
            <PasswordField
              {...field}
              containerClassName="mb-5"
              label={t("auth:confirm_psw") as string}
              labelRequired
              placeholder={t("auth:confirm_psw_placeholder") as string}
              errors={errors.confirmPsw?.message}
            />
          )}
        />

        {renderErrorMessage()}

        <CommonButton
          htmlType="submit"
          content={t("auth:sign_up")}
          className="w-full"
          loading={loading}
          disabled={loading}
        />
      </form>

      <HaveAccount>
        {t("auth:have_account")}
        <span onClick={handleNavigateToLogin}>{t("auth:log_in")}</span>
      </HaveAccount>
    </>
  );
};

export default SignUpForm;
