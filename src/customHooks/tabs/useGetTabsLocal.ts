import { TabsActions } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { getAllChromeTabs } from '@/utils';
import { useEffect, useState } from 'react';

export const useGetTabsLocal = () => {
    const dispatch = useTabsDispatch();
    const [local, setLocal] = useState<chrome.tabs.Tab[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTabs = async () => {
            dispatch({ type: TabsActions.requestTabs });
            setLoading(true);

            const resp = await getAllChromeTabs();
            // const dataTabs = chromeTabsToNiftyTabs(resp ?? []);

            setLocal(resp);
            dispatch({ type: TabsActions.updateLocal, payload: resp });
            dispatch({ type: TabsActions.finishRequestTabs });
            setLoading(false);
        };
        getTabs();
    }, [dispatch]);

    return { local, loading };
};
