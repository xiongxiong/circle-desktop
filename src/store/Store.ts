import { configureStore } from "@reduxjs/toolkit";
import viewModeReducer from "./slice/viewModeSlice";
import curListReducer from "./slice/curListSlice";

export const store = configureStore({
    reducer: {
        viewMode: viewModeReducer,
        curList: curListReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;