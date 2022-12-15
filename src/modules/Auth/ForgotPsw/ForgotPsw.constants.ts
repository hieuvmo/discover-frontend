import * as Yup from "yup";

import { IForgotPsw } from "types/auth.model";
import {
  i18nTranslate,
  maximumCharacter,
  minimumCharacter
} from "helpers/language";

export const initialForgotPswFormValues: IForgotPsw = {
  email: ""
};

export const forgotPswFormSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18nTranslate("auth:is_email"))
    .required(i18nTranslate("auth:is_required"))
    .min(12, minimumCharacter(12))
    .max(40, maximumCharacter(40))
});
