import { createContext, Dispatch } from 'react';
import { TabsActionType, TabsStore } from './tabsContext.types';

export const TabsStoreContext = createContext<TabsStore>({
    local: [],
    saved: [],
    tabSection: 'tabs',
    loading: false
});

export const TabsDispatchContext = createContext<Dispatch<TabsActionType> | null>(null);
