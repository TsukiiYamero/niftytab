import { useContext } from 'react';
import { TabsDispatchContext, TabsStoreContext } from '../tabsContext';

export const useGetTabsContext = () => {
    const context = useContext(TabsStoreContext);

    if (!context)
        throw new Error('TabsStoreContext does not exist');

    return context;
};

export const useTabsDispatch = () => {
    const context = useContext(TabsDispatchContext);

    if (!context)
        throw new Error('TabsDispatchContext does not exist');

    return context;
};
