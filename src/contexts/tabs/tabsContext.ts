import { createContext, Dispatch } from 'react';
import { TabsActionType, TabSectionFilter, TabsStore, TabsStoredType } from './tabsContext.types';

export const TabsStoreContext = createContext<TabsStore>({
    local: [],
    saved: [],
    filtered: [],
    tabSection: TabSectionFilter.tabs,
    typeOfStore: TabsStoredType.local,
    isFiltering: false,
    loading: false
});

export const TabsDispatchContext = createContext<Dispatch<TabsActionType> | null>(null);
