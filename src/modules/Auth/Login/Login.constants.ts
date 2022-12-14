import * as Yup from "yup";

import { ILogin } from "types/auth.model";
import {
  i18nTranslate,
  maximumCharacter,
  minimumCharacter
} from "helpers/language";

export const initialLoginFormValues: ILogin = {
  email: "",
  password: "",
  rememberPsw: false
};

export const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18nTranslate("auth:is_email"))
    .required(i18nTranslate("auth:is_required"))
    .min(12, minimumCharacter(12))
    .max(40, maximumCharacter(40)),
  password: Yup.string()
    .required(i18nTranslate("auth:is_required"))
    .min(8, minimumCharacter(8))
    .max(30, maximumCharacter(30))
});
