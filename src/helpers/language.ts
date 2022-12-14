import i18next from "i18next";

export const i18nTranslate = (str: string) => {
  return i18next.t(str);
};

export const minimumCharacter = (num: number) =>
  `${i18nTranslate("auth:min_field")} ${num} ${i18nTranslate(
    "auth:character"
  )}`;

export const maximumCharacter = (num: number) =>
  `${i18nTranslate("auth:max_field")} ${num} ${i18nTranslate(
    "auth:character"
  )}`;
