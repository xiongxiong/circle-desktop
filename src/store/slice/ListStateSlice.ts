import { IListBasic } from "@/interface/Data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';


interface ListState {
    listSelected?: IListBasic,
    listExpanded: Array<number>,
}

const initialState: ListState = {
    listSelected: undefined,
    listExpanded: [],
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setListSelected: (state, action) => {
            state.listSelected = action.payload
        },
        clrListSelected: (state) => {
            state.listSelected = undefined;
        },
        addListExpanded: (state, action) => {
            state.listExpanded.push(action.payload);
        },
        delListExpanded: (state, action) => {
            state.listExpanded = state.listExpanded.filter(id => id !== action.payload);
        }
    }
});

export const {setListSelected, clrListSelected, addListExpanded, delListExpanded} = listSlice.actions;

export const selectedList = (state: RootState) => state.list.listSelected;

export const expandedList = (state: RootState) => state.list.listExpanded;

export default listSlice.reducer;