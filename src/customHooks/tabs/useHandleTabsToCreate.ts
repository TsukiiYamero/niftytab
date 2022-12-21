import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { TabsSupabase } from '@/models';
import { readTabs } from '@/services/tabs';
import { handleUniqueTabs } from '@/utils/tabs/filterUniqueTabsForSupabase';

export const useHandleTabsToCreate = () => {
    const { callApi: fetchTabs } = useFetchWithCallback();
    /**
     * retrieve Data from DB to compare if already exist
     * @param tabs TabsSupabase
     */
    const handleTabsToCreate = async (tabs: TabsSupabase[] = []) => {
        const { data: tabsInSupabase, error: errorInReadTabs } = await fetchTabs(readTabs);

        if (errorInReadTabs) return {
            tabsFiltered: [],
            tabsForOverWrite: [],
            requestForOverWrite: [],
            errorInReadTabs
        };

        const tabsFiltered = await handleUniqueTabs(tabs, tabsInSupabase);

        const structOfTabsToUpdate: Array<{ fetchFunc: (c: AbortController, payload?: any) => any, data: any }> = [];

        return {
            tabsFiltered,
            structOfTabsToUpdate,
            errorInReadTabs: null
        };
    };

    return { handleTabsToCreate };
};
