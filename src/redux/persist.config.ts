import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import searchReducer from "./features/search.slice";
import laptopReducer from "./features/laptop.slice";
import authReducer from "./features/auth.slice";
import profileReducer from "./features/profile.slice";

const searchPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: "search",
  storage,
  blacklist: ["value", "showedSearchBar"]
};

const laptopPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: "laptop",
  storage,
  blacklist: ["commentItem"]
};

const authPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: "auth",
  storage,
  blacklist: ["modalMode", "showModal", "message", "success"]
};

const profilePersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: "profile",
  storage
};

export default {
  search: persistReducer(searchPersistConfig, searchReducer),
  laptop: persistReducer(laptopPersistConfig, laptopReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  profile: persistReducer(profilePersistConfig, profileReducer)
};
