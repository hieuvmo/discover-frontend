import * as Yup from "yup";

import { i18nTranslate } from "helpers/language";

const validatePhoneNumRegEx = /^\d+$/;

export const paymentFormSchema = Yup.object().shape({
  address: Yup.string().required(i18nTranslate("auth:is_required")),
  telephone: Yup.string()
    .required(i18nTranslate("auth:is_required"))
    .matches(validatePhoneNumRegEx, i18nTranslate("cart:phone_regex"))
});
