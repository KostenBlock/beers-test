
import { configureStore } from "@reduxjs/toolkit";
import beersSlice from "./reducers/beers.slice";

export const store = configureStore({
    reducer: {
        beers: beersSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
