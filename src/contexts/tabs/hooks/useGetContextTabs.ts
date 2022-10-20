import { useContext } from 'react';
import { TabsStoreContext } from '../tabsContext';

export const useGetContextTabs = () => {
    const context = useContext(TabsStoreContext);
    return context;
};
