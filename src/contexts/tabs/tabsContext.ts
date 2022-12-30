import { createContext, Dispatch } from 'react';
import { TabsActionType, TabSectionFilter, TabsStore, TabsStoredType } from './tabsContext.types';
import { NiftyTab, SessionNiftyCount } from '@/models';

export const TabsStoreContext = createContext<TabsStore<NiftyTab | SessionNiftyCount>>({
    local: [],
    saved: [],
    filtered: [],
    sessions: [],
    tabSection: TabSectionFilter.tabs,
    typeOfStore: TabsStoredType.local,
    isFiltering: false,
    loading: false
});

export const TabsDispatchContext = createContext<Dispatch<TabsActionType> | null>(null);
