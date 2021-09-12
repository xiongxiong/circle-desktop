import { IListBasic } from "@/interface/Data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';


interface CurListState {
    value?: IListBasic
}

const initialState: CurListState = {
    value: undefined
}

export const curListSlice = createSlice({
    name: 'curList',
    initialState,
    reducers: {
        setCurList: (state, action) => {
            state.value = action.payload
        },
        clrCurList: (state) => {
            state.value = undefined;
        }
    }
});

export const {setCurList, clrCurList} = curListSlice.actions;

export const selectCurList = (state: RootState) => state.curList.value;

export default curListSlice.reducer;