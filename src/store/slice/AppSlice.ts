import { IListBasic } from "@/interface/Data";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../store';


interface State {
    listSelected?: IListBasic,
    listExpanded: Array<number>,
}

const initialState: State = {
    listSelected: undefined,
    listExpanded: [],
}

const slice = createSlice({
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
        },
    }
});

export const {setListSelected, clrListSelected, addListExpanded, delListExpanded} = slice.actions;

export const selectedList = (state: RootState) => state.app.listSelected;

export const expandedList = (state: RootState) => state.app.listExpanded;

export default slice.reducer;