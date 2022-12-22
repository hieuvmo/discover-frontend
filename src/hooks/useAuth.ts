import { getAccessTokenFromCookie } from "helpers/token";

function useAuth() {
  const token = getAccessTokenFromCookie();

  return !!token;
}

export default useAuth;
