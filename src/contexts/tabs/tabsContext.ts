import { createContext, Dispatch } from 'react';
import { TabsActionType, TabSectionFilter, TabsStore, TypeOfStore } from './tabsContext.types';

export const TabsStoreContext = createContext<TabsStore>({
    filterQuery: '',
    filterSection: TabSectionFilter.tabs,
    local: [],
    cloud: [],
    sessions: [],
    tabSection: TabSectionFilter.tabs,
    typeOfStore: TypeOfStore.local,
    isFiltering: false,
    loading: false
});

export const TabsDispatchContext = createContext<Dispatch<TabsActionType> | null>(null);
