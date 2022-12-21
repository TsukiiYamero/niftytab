import { useContext } from 'react';
import { TabsDispatchContext, TabsStoreContext } from '../tabsContext';

export const useGetTabsContext = () => {
    const context = useContext(TabsStoreContext);
    return context;
};

export const useTabsDispatch = () => {
    const context = useContext(TabsDispatchContext);

    if (!context)
        throw new Error('useAuthDispatch must be used within an AuthProvider');

    return context;
};
