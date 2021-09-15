import { configureStore } from "@reduxjs/toolkit";
import viewModeReducer from "./slice/ViewModeSlice";
import curListReducer from "./slice/ListStateSlice";

export const store = configureStore({
    reducer: {
        viewMode: viewModeReducer,
        list: curListReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;