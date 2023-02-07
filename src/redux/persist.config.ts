import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import searchReducer from "./features/search.slice";
import laptopReducer from "./features/laptop.slice";
import authReducer from "./features/auth.slice";
import profileReducer from "./features/profile.slice";
import cartReducer from "./features/cart.slice";
import favoriteReducer from "./features/favorite.slice";
import receiptReducer from "./features/receipt.slice";

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
  storage,
  blacklist: ["provinceList", "districtList", "wardList", "uploadedImg"]
};

const cartPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: "cart",
  storage
};

const favoritePersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: "favorite",
  storage
};

const receiptPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: "receipt",
  storage,
  blacklist: ["modalType", "openModal"]
};

export default {
  search: persistReducer(searchPersistConfig, searchReducer),
  laptop: persistReducer(laptopPersistConfig, laptopReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  profile: persistReducer(profilePersistConfig, profileReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  favorite: persistReducer(favoritePersistConfig, favoriteReducer),
  receipt: persistReducer(receiptPersistConfig, receiptReducer)
};
