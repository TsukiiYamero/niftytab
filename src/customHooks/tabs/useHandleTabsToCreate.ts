import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { TabsSupabase } from '@/models';
import { readTabs, updateTabs } from '@/services/tabs';
import { handleDuplicateTabs } from '@/utils/tabs/filterUniqueTabsForSupabase';

export const useHandleTabsToCreate = () => {
    const { callApi: fetchTabs } = useFetchWithCallback();

    const handleTabsToCreate = async (tabs: TabsSupabase[] = []) => {
        const { data: tabsInSupabase, error: errorInReadTabs } = await fetchTabs(readTabs);

        if (errorInReadTabs) return {
            tabsFiltered: [],
            tabsForOverWrite: [],
            requestForOverWrite: [],
            errorInReadTabs
        };

        const { tabsFiltered, tabsForOverWrite } = await handleDuplicateTabs(tabs, tabsInSupabase);

        const structOfTabsToUpdate: Array<{ fetchFunc: (c: AbortController, payload?: any) => any, data: any }> = [];

        if (tabsForOverWrite.length > 0) {
            tabsForOverWrite.forEach(tab => {
                structOfTabsToUpdate.push({ fetchFunc: updateTabs, data: tab });
            });
        }

        return {
            tabsFiltered,
            tabsForOverWrite,
            structOfTabsToUpdate,
            errorInReadTabs: null
        };
    };

    return { handleTabsToCreate };
};
