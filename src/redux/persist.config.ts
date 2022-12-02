import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import counterReducer from "./features/counter.slice";

const counterPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: "counter",
  storage,
  blacklist: ["value"]
};

export default {
  counter: persistReducer(counterPersistConfig, counterReducer)
};
