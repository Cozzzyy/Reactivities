import CounterStore from "./CounterStore.ts";
import UiStore from "./UiStore.ts";
import {createContext} from "react";

interface Store {
    counterStore: CounterStore;
    uiStore: UiStore;
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore(),
}

export const StoreContext = createContext(store);