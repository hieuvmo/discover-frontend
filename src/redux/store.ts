import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import counterReducer from "./features/counter.slice";
import persistConfig from "./persist.config";

const combinedReducers = combineReducers({ counter: counterReducer });

export const store = configureStore({
  reducer: combineReducers(persistConfig) as Reducer
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = typeof store.dispatch;
