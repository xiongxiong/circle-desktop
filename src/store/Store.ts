import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import viewModeReducer from "./slice/ViewModeSlice";
import curListReducer from "./slice/ListStateSlice";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    viewMode: viewModeReducer,
    list: curListReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;