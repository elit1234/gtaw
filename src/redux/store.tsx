import { configureStore } from "@reduxjs/toolkit";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { createWrapper } from "next-redux-wrapper";

import { userSlice } from "./user";

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [userSlice.name],
        })
      ),
  })
);

export const wrapper: any = createWrapper(makeStore);
