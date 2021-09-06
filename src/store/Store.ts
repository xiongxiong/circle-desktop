import { Instance, onSnapshot, onPatch, types } from "mobx-state-tree";
import React from "react";

const RootStore = types.model({
    viewMode: types.enumeration("viewMode", ["list", "search"])
}).actions(self => ({
    setViewModeToList: () => {
        self.viewMode = "list";
    },
    setViewModeToSearch: () => {
        self.viewMode = "search";
    }
}));

export interface IRootStore extends Instance<typeof RootStore> {}

export const rootStore = RootStore.create({
    viewMode: "list"
});

export const StoreContext = React.createContext(rootStore);

onSnapshot(rootStore, snapshot => {
    console.log("ROOT STORE :", snapshot);
});

onPatch(rootStore, patch => {
    console.log("ROOT STORE CHANGE :", patch);
});
