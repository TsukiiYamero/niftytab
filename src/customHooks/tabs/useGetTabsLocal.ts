import { TabsActions } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { NiftyTab } from '@/models';
import { chromeTabsToNiftyTabs, getAllChromeTabs } from '@/utils';
import { useEffect, useState } from 'react';

export const useGetTabsLocal = () => {
    const dispatch = useTabsDispatch();
    const [local, setLocal] = useState<NiftyTab[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTabs = async () => {
            dispatch({ type: TabsActions.requestTabs });
            setLoading(true);

            const resp = await getAllChromeTabs();
            const dataTabs = chromeTabsToNiftyTabs(resp ?? []);

            setLocal(dataTabs);
            dispatch({ type: TabsActions.updateLocal, payload: dataTabs });
            dispatch({ type: TabsActions.finishRequestTabs });
            setLoading(false);
        };
        getTabs();
    }, [dispatch]);

    return { local, loading };
};
