import { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DefaultOptionType } from "antd/es/select";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  IDistrict,
  IPersonalAddress,
  IProvince,
  IWard
} from "types/profile.model";
import { CommonButton, CommonSelect, CommonStep, TextField } from "components";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { RootState } from "redux/store";
import {
  getDistrictActionRequest,
  getProvinceActionRequest,
  getWardActionRequest
} from "redux/features/profile.slice";
import { ProfileTitle } from "../Profile.styled";
import {
  PersonalAddressFormSchema,
  initialPersonalAddressFormValues
} from "../Profile.constants";

const PersonalAddress = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { provinceList, districtList, wardList } = useAppSelector(
    (state: RootState) => state.profile
  );

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<IPersonalAddress>({
    mode: "onChange",
    defaultValues: initialPersonalAddressFormValues,
    resolver: yupResolver(PersonalAddressFormSchema)
  });

  const handleSubmitPersonalAddressForm = (data: IPersonalAddress) => {
    console.log("data", data);
  };

  const selectOption = useCallback(
    (type: "province" | "district" | "ward") => {
      const provinceSelectList: DefaultOptionType[] = provinceList?.map(
        (province: IProvince) => ({
          value: province.province_id,
          label: province.province_name
        })
      );
      const districtSelectList: DefaultOptionType[] = districtList?.map(
        (district: IDistrict) => ({
          value: district.district_id,
          label: district.district_name
        })
      );
      const wardSelectList: DefaultOptionType[] = wardList?.map(
        (ward: IWard) => ({
          value: ward.ward_id,
          label: ward.ward_name
        })
      );

      if (type === "province") return provinceSelectList;
      if (type === "district") return districtSelectList;
      return wardSelectList;
    },
    [districtList, provinceList, wardList]
  );

  const stepList = [
    {
      key: "province",
      title: (
        <Controller
          name="province"
          control={control}
          render={({ field }) => {
            return (
              <CommonSelect
                {...field}
                containerClassName="mb-4"
                selectLabel={{
                  text: `${t("profile:province")}`,
                  required: true
                }}
                placeholder={`${t("profile:province_placeholder")}`}
                options={selectOption("province")}
                errorText={errors.province?.message}
              />
            );
          }}
        />
      )
    },
    {
      key: "district",
      title: (
        <Controller
          name="district"
          control={control}
          render={({ field }) => {
            return (
              <CommonSelect
                {...field}
                containerClassName="mb-4"
                selectLabel={{
                  text: `${t("profile:district")}`,
                  required: true
                }}
                placeholder={`${t("profile:district_placeholder")}`}
                options={selectOption("district")}
                errorText={errors.district?.message}
              />
            );
          }}
        />
      )
    },
    {
      key: "ward",
      title: (
        <Controller
          name="ward"
          control={control}
          render={({ field }) => {
            return (
              <CommonSelect
                {...field}
                containerClassName="mb-4"
                selectLabel={{
                  text: `${t("profile:ward")}`,
                  required: true
                }}
                placeholder={`${t("profile:ward_placeholder")}`}
                options={selectOption("ward")}
                errorText={errors.district?.message}
              />
            );
          }}
        />
      )
    },
    {
      key: "address",
      title: (
        <Controller
          name="address"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                containerClassName="mb-4"
                label={`${t("profile:house_no")}`}
                labelRequired
                placeholder={`${t("profile:house_no_placeholder")}`}
                errors={errors.address?.message}
              />
            );
          }}
        />
      )
    }
  ];

  useEffect(() => {
    dispatch(getProvinceActionRequest());
  }, [dispatch]);

  useEffect(() => {
    if (watch("province")) {
      setCurrentStep(1);
      reset({
        ...watch(),
        district: null,
        ward: null,
        address: ""
      });
      dispatch(getDistrictActionRequest(watch("province") as string));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, watch("province")]);

  useEffect(() => {
    if (watch("district")) {
      setCurrentStep(2);
      reset({ ...watch(), ward: null, address: "" });

      dispatch(getWardActionRequest(watch("district") as string));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, watch("district")]);

  useEffect(() => {
    if (watch("ward")) {
      setCurrentStep(3);
      reset({ ...watch(), address: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("ward")]);

  return (
    <form onSubmit={handleSubmit(handleSubmitPersonalAddressForm)}>
      <ProfileTitle>{t("profile:address")}</ProfileTitle>
      <CommonStep current={currentStep} items={stepList} direction="vertical" />

      <CommonButton
        htmlType="submit"
        content={t("profile:update")}
        className="w-full"
      />
    </form>
  );
};

export default PersonalAddress;
