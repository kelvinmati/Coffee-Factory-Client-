import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./reducers/Auth";
import { errorReducer } from "./reducers/Errors";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    errors: errorReducer,
  },
});
