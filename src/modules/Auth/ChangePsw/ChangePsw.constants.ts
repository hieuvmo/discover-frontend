import * as Yup from "yup";

import { IChangePsw } from "types/auth.model";
import {
  i18nTranslate,
  maximumCharacter,
  minimumCharacter
} from "helpers/language";

export const initialChangePswFormValues: IChangePsw = {
  oldPassword: "",
  newPassword: "",
  confirmNewPsw: ""
};

const validatePasswordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const changePswFormSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required(i18nTranslate("auth:is_required"))
    .min(8, minimumCharacter(8))
    .max(30, maximumCharacter(30)),
  newPassword: Yup.string()
    .required(i18nTranslate("auth:is_required"))
    .min(8, minimumCharacter(8))
    .max(30, maximumCharacter(30))
    .matches(validatePasswordRegEx, i18nTranslate("auth:psw_regex"))
    .notOneOf(
      [Yup.ref("oldPassword"), null],
      i18nTranslate("auth:old_differ_new")
    ),
  confirmNewPsw: Yup.string()
    .required(i18nTranslate("auth:is_required"))
    .min(8, minimumCharacter(8))
    .max(30, maximumCharacter(30))
    .oneOf(
      [Yup.ref("newPassword"), null],
      i18nTranslate("auth:old_match_new_psw")
    )
});
