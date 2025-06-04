import { configureStore } from "@reduxjs/toolkit";

import reducer from "./rootReducer";

const store = configureStore({
  reducer,
  devTools: import.meta.env.DEV && {
    trace: true,
    traceLimit: 15,
  },
});

export type T_RootState = ReturnType<typeof store.getState>;
export type T_AppDispatch = typeof store.dispatch;

export default store;
