import * as Yup from "yup";

import { ISignUp, IUserRole, IUserStatus } from "types/auth.model";
import {
  i18nTranslate,
  maximumCharacter,
  minimumCharacter
} from "helpers/language";

export const initialSignUpFormValues: ISignUp = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPsw: "",
  role: IUserRole.USER,
  status: IUserStatus.ACTIVE
};

const validatePasswordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const signUpFormSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18nTranslate("auth:is_email"))
    .required(i18nTranslate("auth:is_required"))
    .min(12, minimumCharacter(12))
    .max(40, maximumCharacter(40)),
  password: Yup.string()
    .required(i18nTranslate("auth:is_required"))
    .min(8, minimumCharacter(8))
    .max(30, maximumCharacter(30))
    .matches(validatePasswordRegEx, i18nTranslate("auth:psw_regex")),
  confirmPsw: Yup.string()
    .required(i18nTranslate("auth:is_required"))
    .min(8, minimumCharacter(8))
    .max(30, maximumCharacter(30))
    .oneOf([Yup.ref("password"), null], i18nTranslate("auth:match_psw"))
});
