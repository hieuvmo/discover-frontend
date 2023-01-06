import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

import { IPersonalInfo } from "types/profile.model";
import { CommonButton, CommonDatePick, TextField } from "components";
import { useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import { ProfileTitle } from "../Profile.styled";
import {
  PersonalInfoFormSchema,
  initialPersonalInfoFormValues
} from "../Profile.constants";

const PersonalInfoForm = () => {
  const { t } = useTranslation();
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors }
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
    console.log("formatData", formatData);
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
        render={({ field: { name, ref, onChange, onBlur } }) => {
          return (
            <CommonDatePick
              name={name}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
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
      />
    </form>
  );
};

export default PersonalInfoForm;
