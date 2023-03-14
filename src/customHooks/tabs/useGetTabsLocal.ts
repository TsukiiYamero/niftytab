import { TabsActions } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { chromeTabsToNiftyTabs, getAllChromeTabs } from '@/utils';
import { useEffect } from 'react';

export const useGetTabsLocal = () => {
    const dispatch = useTabsDispatch();
    const { local, loading } = useGetTabsContext();

    useEffect(() => {
        const getTabs = async () => {
            dispatch({ type: TabsActions.requestTabs });

            const resp = await getAllChromeTabs();
            const dataTabs = chromeTabsToNiftyTabs(resp ?? []);
            dispatch({ type: TabsActions.updateLocal, payload: dataTabs });
            dispatch({ type: TabsActions.finishRequestTabs });
        };
        getTabs();
    }, [dispatch]);

    return { local, loading };
};
