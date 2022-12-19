import { authKeyStorage } from "constants/store.key";
import { getCookie } from "helpers/storage";

function useAuth() {
  const token = getCookie(authKeyStorage.ACCESS_TOKEN);

  return !!token;
}

export default useAuth;
