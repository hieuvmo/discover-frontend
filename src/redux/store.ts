import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "@redux-saga/core";

import searchReducer from "./features/search.slice";
import laptopReducer from "./features/laptop.slice";
import persistConfig from "./persist.config";
import rootSaga from "./root.saga";

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
  search: searchReducer,
  laptop: laptopReducer
});

export const store = configureStore({
  reducer: combineReducers(persistConfig) as Reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = typeof store.dispatch;
