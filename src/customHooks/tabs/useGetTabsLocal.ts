import { TabsActions } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { NiftyTab } from '@/models';
import { chromeTabsToNiftyTabs, getAllChromeTabs } from '@/utils';
import { useEffect, useState } from 'react';

export const useGetTabsLocal = () => {
    const dispatch = useTabsDispatch();
    const [tabsLocal, setTabsLocal] = useState<NiftyTab[]>([]);

    useEffect(() => {
        const getTabs = async () => {
            dispatch({ type: TabsActions.requestTabs });

            const resp = await getAllChromeTabs();
            const dataTabs = chromeTabsToNiftyTabs(resp ?? []);
            dispatch({ type: TabsActions.finishRequestTabs });
            setTabsLocal(dataTabs);
        };
        getTabs();
    }, [dispatch]);

    return tabsLocal;
};
