import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton, PasswordField, TextField } from "components";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ISignUp } from "types/auth.model";
import { initialSignUpFormValues, signUpFormSchema } from "./SignUp.constants";
import { FullNameWrapper, HaveAccount, SignUpTitle } from "./SignUpForm.styled";

const SignUpForm = () => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ISignUp>({
    mode: "onChange",
    defaultValues: initialSignUpFormValues,
    resolver: yupResolver(signUpFormSchema)
  });

  const onSubmit = (data: ISignUp) => {
    console.log("data", data);
  };

  return (
    <>
      <SignUpTitle>{t("auth:sign_up")}</SignUpTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <CommonButton
          htmlType="submit"
          content={t("auth:sign_up")}
          className="w-full"
        />
      </form>

      <HaveAccount>
        {t("auth:have_account")}
        <span>{t("auth:log_in")}</span>
      </HaveAccount>
    </>
  );
};

export default SignUpForm;
