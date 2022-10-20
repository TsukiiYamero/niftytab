import { createContext, Dispatch } from 'react';
import { TabsActionType, TabSectionFilter, TabsStore, TabsStoredType } from './tabsContext.types';

export const TabsStoreContext = createContext<TabsStore>({
    local: [],
    saved: [],
    tabSection: TabSectionFilter.tabs,
    typeOfStore: TabsStoredType.local,
    loading: false
});

export const TabsDispatchContext = createContext<Dispatch<TabsActionType> | null>(null);
