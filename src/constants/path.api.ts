export const SERVICE_API = "http://localhost:5000";

const endPointAPIs = {
  AUTH: "/api/user/",
  LAPTOP: "/api/laptop",
  RECEIPT: "/api/receipt",
  PROFILE: "/api/profile"
};

export const authAPI = {
  signup: `${endPointAPIs.AUTH}/sign-up`,
  login: `${endPointAPIs.AUTH}/log-in`,
  logout: `${endPointAPIs.AUTH}/log-out`,
  forgotPassword: `${endPointAPIs.AUTH}/password-recover`,
  changePassword: `${endPointAPIs.AUTH}/change-password`
};
