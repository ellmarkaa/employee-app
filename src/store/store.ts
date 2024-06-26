import {configureStore} from '@reduxjs/toolkit';
import {employeeApi} from "@/store/employee/employeeApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [employeeApi.reducerPath]: employeeApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(employeeApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];