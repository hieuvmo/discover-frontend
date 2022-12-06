import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import searchReducer from "./features/search.slice";
import laptopReducer from "./features/laptop.slice";

const searchPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: "search",
  storage,
  blacklist: ["value", "showedSearchBar"]
};

const laptopPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: "laptop",
  storage
};

export default {
  search: persistReducer(searchPersistConfig, searchReducer),
  laptop: persistReducer(laptopPersistConfig, laptopReducer)
};
