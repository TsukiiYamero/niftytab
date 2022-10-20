import { createContext, Dispatch } from 'react';
import { TabsActionType, TabSectionFilter, TabsStore } from './tabsContext.types';

export const TabsStoreContext = createContext<TabsStore>({
    local: [],
    saved: [],
    tabSection: TabSectionFilter.tabs,
    loading: false
});

export const TabsDispatchContext = createContext<Dispatch<TabsActionType> | null>(null);
