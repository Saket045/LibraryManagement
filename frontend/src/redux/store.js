import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/userSlice.js";
import pageReducer from "./slices/pageSlice.js"
const persistConfig = {
  key: "new-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    page:pageReducer,
  },
});

const Persistor = persistStore(store);

export { Persistor };
export default store;
