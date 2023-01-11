import { createContext, Dispatch } from 'react';
import { TabsActionType, TabSectionFilter, TabsStore, TypeOfStore } from './tabsContext.types';
import { NiftyTab, SessionNiftyCount } from '@/models';

export const TabsStoreContext = createContext<TabsStore<NiftyTab | SessionNiftyCount>>({
    local: [],
    saved: [],
    filtered: [],
    sessions: [],
    tabSection: TabSectionFilter.tabs,
    typeOfStore: TypeOfStore.local,
    isFiltering: false,
    loading: false
});

export const TabsDispatchContext = createContext<Dispatch<TabsActionType> | null>(null);
