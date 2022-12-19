export const SERVICE_API = "http://localhost:5000";

const endPointAPIs = {
  AUTH: "/api/user",
  LAPTOP: "/api/laptop",
  RECEIPT: "/api/receipt",
  PROFILE: "/api/profile"
};

export const authAPIs = {
  SIGNUP: `${endPointAPIs.AUTH}/sign-up`,
  LOGIN: `${endPointAPIs.AUTH}/log-in`,
  LOGOUT: `${endPointAPIs.AUTH}/log-out`,
  FORGOT_PASSWORD: `${endPointAPIs.AUTH}/password-recover`,
  CHANGE_PASSWORD: `${endPointAPIs.AUTH}/change-password`
};

export const laptopAPIs = {
  LIST: `${endPointAPIs.LAPTOP}`
};
