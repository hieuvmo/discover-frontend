/* eslint-disable no-undef */
export const SERVICE_API = "http://localhost:5000";

const endPointAPIs = {
  AUTH: "/api/user",
  LAPTOP: "/api/laptop",
  RECEIPT: "/api/receipt",
  PROFILE: "/api/profile"
};

const thirdPartyAPIs = {
  PORT: "https://vapi.vnappmob.com/api",
  PROVINCE: "/province",
  DISTRICT: "/district",
  WARD: "/ward"
};

export const authAPIs = {
  SIGNUP: `${endPointAPIs.AUTH}/sign-up`,
  LOGIN: `${endPointAPIs.AUTH}/log-in`,
  LOGOUT: `${endPointAPIs.AUTH}/log-out`,
  FORGOT_PASSWORD: `${endPointAPIs.AUTH}/password-recover`,
  CHANGE_PASSWORD: `${endPointAPIs.AUTH}/change-password`,
  GEN_NEW_TOKEN: `${endPointAPIs.AUTH}/gen-new-token`
};

export const laptopAPIs = {
  LIST: `${endPointAPIs.LAPTOP}`
};

export const profileAPIs = {
  PROVINCE: `${thirdPartyAPIs.PORT}${thirdPartyAPIs.PROVINCE}`,
  DISTRICT: (provinceId: string) =>
    `${thirdPartyAPIs.PORT}${thirdPartyAPIs.PROVINCE}${thirdPartyAPIs.DISTRICT}/${provinceId}`,
  WARD: (districtId: string) =>
    `${thirdPartyAPIs.PORT}${thirdPartyAPIs.PROVINCE}${thirdPartyAPIs.WARD}/${districtId}`
};
