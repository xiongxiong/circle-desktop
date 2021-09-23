import { IListBasic } from "@/interface/Data";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../store';


interface State {
    listSelected?: IListBasic,
    listExpanded: Array<number>,
    contentToSearch?: string,
}

const initialState: State = {
    listSelected: undefined,
    listExpanded: [],
    contentToSearch: undefined,
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
        setContentToSearch: (state, action) => {
            state.contentToSearch = action.payload;
        }
    }
});

export const {setListSelected, clrListSelected, addListExpanded, delListExpanded, setContentToSearch} = slice.actions;

export const selectedList = (state: RootState) => state.app.listSelected;

export const expandedList = (state: RootState) => state.app.listExpanded;

export const contentToSearch = (state: RootState) => state.app.contentToSearch;

export default slice.reducer;