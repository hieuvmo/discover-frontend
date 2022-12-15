import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Checkbox } from "antd";

import { CommonButton, PasswordField, TextField } from "components";
import { ILogin } from "types/auth.model";
import { useAppDispatch } from "hooks/useRedux";
import {
  showForgotPswFormModal,
  showSignUpFormModal
} from "redux/features/auth.slice";
import { initialLoginFormValues, loginFormSchema } from "./Login.constants";
import {
  ForgotPswText,
  LoginTitle,
  NotHaveAccount,
  PasswordWrapper,
  RememberPswText,
  RememberPswWrapper
} from "./LoginForm.styled";

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleNavigateToAuthModule = (mode: "sign-up" | "forgot-psw") => {
    mode === "sign-up" && dispatch(showSignUpFormModal());
    mode === "forgot-psw" && dispatch(showForgotPswFormModal());
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

  const onSubmit = (data: ILogin) => {
    console.log("data", data);
  };

  return (
    <>
      <LoginTitle>{t("auth:log_in")}</LoginTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
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
                <Checkbox ref={ref} onChange={onChange} checked={value} />
              )}
            />
            <RememberPswText>{t("auth:remember_psw")}</RememberPswText>
          </RememberPswWrapper>
          <ForgotPswText
            onClick={() => handleNavigateToAuthModule("forgot-psw")}
          >
            {t("auth:forgot_psw")}
          </ForgotPswText>
        </PasswordWrapper>

        <CommonButton
          htmlType="submit"
          content={t("auth:log_in")}
          className="w-full"
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
