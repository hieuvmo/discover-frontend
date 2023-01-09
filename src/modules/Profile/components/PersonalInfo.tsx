import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import dayjs from "dayjs";

import { IPersonalInfo } from "types/profile.model";
import { CommonButton, CommonDatePick, TextField } from "components";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { updateProfileActionRequest } from "redux/features/auth.slice";
import { ProfileTitle } from "../Profile.styled";
import { PersonalInfoFormSchema } from "../Profile.constants";

const PersonalInfoForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userInfo, profile, loading } = useAppSelector(
    (state: RootState) => state.auth
  );

  const initialPersonalInfoFormValues: IPersonalInfo = useMemo(() => {
    return {
      lastName: profile ? profile.lastName : "",
      firstName: profile ? profile.firstName : "",
      dob: profile ? profile.dob : moment().format()
    };
  }, [profile]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty }
  } = useForm<IPersonalInfo>({
    mode: "onChange",
    defaultValues: initialPersonalInfoFormValues,
    resolver: yupResolver(PersonalInfoFormSchema)
  });

  const handleSubmitPersonalInfoForm = (data: IPersonalInfo) => {
    const formatData: IPersonalInfo = {
      ...data,
      dob: moment(data.dob).format()
    };

    dispatch(
      updateProfileActionRequest({
        params: formatData,
        userId: `${userInfo?._id}`,
        onFinish() {
          reset({ ...formatData });
        }
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitPersonalInfoForm)}>
      <ProfileTitle>{t("profile:personal")}</ProfileTitle>

      <TextField
        containerClassName="mb-4"
        label={`${t("auth:email")}`}
        value={userInfo?.email}
        disabled
      />

      <CommonDatePick
        containerClassName="mb-4"
        datePickerLabel={{
          text: `${t("profile:participate_date")}`
        }}
        value={dayjs(userInfo?.createdAt)}
        disabled
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              containerClassName="mb-4"
              label={`${t("auth:last_name")}`}
              labelRequired
              placeholder={`${t("auth:last_name_placeholder")}`}
              errors={errors.firstName?.message}
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
              containerClassName="mb-4"
              label={`${t("auth:first_name")}`}
              labelRequired
              placeholder={`${t("auth:first_name_placeholder")}`}
              errors={errors.firstName?.message}
            />
          );
        }}
      />

      <Controller
        name="dob"
        control={control}
        render={({ field: { name, ref, onChange, onBlur, value } }) => {
          return (
            <CommonDatePick
              name={name}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={dayjs(value)}
              containerClassName="mb-7"
              placeholder={`${t("profile:dob_placeholder")}`}
              datePickerLabel={{
                text: `${t("profile:dob")}`,
                required: true
              }}
              errorText={errors.dob?.message}
            />
          );
        }}
      />

      <CommonButton
        htmlType="submit"
        content={t("profile:update")}
        className="w-full"
        loading={loading}
        disabled={loading || !isDirty}
      />
    </form>
  );
};

export default PersonalInfoForm;
