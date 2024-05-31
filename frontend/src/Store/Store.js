import { combineReducers, configureStore } from "@reduxjs/toolkit";
import signInApi from "./api/signInApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authSlice } from "./Slices/signInSlice";
import profileApi from "./api/profileApi";
import postApi from "./api/PostApi";
import { persistStore, persistReducer, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage"; //
// export const { useLoginQuery } = signInApi;
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth: authSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: {
    persistedReducer,
    [signInApi.reducerPath]: signInApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    })
      .concat(signInApi.middleware)
      .concat(profileApi.middleware)
      .concat(postApi.middleware),
});
setupListeners(store.dispatch);
const persistor = persistStore(store);
export { store, persistor };
