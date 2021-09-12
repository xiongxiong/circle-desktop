import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

export enum ViewMode {
    CASCADE,
    SEARCH
}

interface ViewModeState {
    value: ViewMode
}

const initialState: ViewModeState = {
    value: ViewMode.CASCADE
}

export const viewModeSlice = createSlice({
    name: 'viewMode',
    initialState,
    reducers: {
        toggle: (state) => {
            const { value } = state;
            switch (value) {
                case ViewMode.CASCADE:
                    state.value = ViewMode.SEARCH;
                    break;
                case ViewMode.SEARCH:
                    state.value = ViewMode.CASCADE;
                    break;
                default: break;
            }
        }
    }
});

export const {toggle} = viewModeSlice.actions;

export const selectViewMode = (state: RootState) => state.viewMode.value;

export default viewModeSlice.reducer;