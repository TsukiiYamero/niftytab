import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { TabsSupabase } from '@/models';
import { readTabs } from '@/services/tabs';
import { handleUniqueTabs } from '@/utils/tabs/filterUniqueTabsForSupabase';

export const useHandleTabsToCreate = () => {
    const { callApi: fetchTabs } = useFetchWithCallback();
    /**
     * Compare `tabs` with `tabsSupabase` from DB and filter by duplicated tabs
     */
    const getTabsFiltered = async (tabs: TabsSupabase[] = []) => {
        const { data: tabsInSupabase, error: errorInReadTabs } = await fetchTabs(readTabs);

        if (errorInReadTabs) return {
            tabsFiltered: [],
            errorInReadTabs
        };

        const tabsFiltered = await handleUniqueTabs(tabs, tabsInSupabase);

        return {
            tabsFiltered,
            errorInReadTabs: null
        };
    };

    return { getTabsFiltered };
};
