import * as Yup from "yup";

import {
  IPersonalAddress,
  IPersonalInfo,
  ProfileTabs
} from "types/profile.model";
import { i18nTranslate } from "helpers/language";

export const initialPersonalInfoFormValues: IPersonalInfo = {
  lastName: "",
  firstName: "",
  dob: ""
};

export const initialPersonalAddressFormValues: IPersonalAddress = {
  province: null,
  district: null,
  ward: null,
  address: ""
};

export const PersonalInfoFormSchema = Yup.object().shape({
  lastName: Yup.string().required(i18nTranslate("auth:is_required")),
  firstName: Yup.string().required(i18nTranslate("auth:is_required")),
  dob: Yup.string().required(i18nTranslate("auth:is_required"))
});

export const PersonalAddressFormSchema = Yup.object().shape({
  province: Yup.string().required(i18nTranslate("auth:is_required")),
  district: Yup.string().required(i18nTranslate("auth:is_required")),
  ward: Yup.string().required(i18nTranslate("auth:is_required")),
  address: Yup.string().required(i18nTranslate("auth:is_required"))
});

export const profileTabArr = [
  ProfileTabs.PERSONAL_INFO,
  ProfileTabs.PERSONAL_ADDRESS,
  ProfileTabs.CHANGE_PSW,
  ProfileTabs.ORDER,
  ProfileTabs.FAVORITE
];
