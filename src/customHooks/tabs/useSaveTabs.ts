import { useAuthState } from '@/contexts/auth';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { SupabaseCommonResponse } from '@/models';
import { createTabs } from '@/services/tabs';
import { chromeTabsToTabsSupabase } from '@/utils/tabs/createTabsSupabase';
import { PostgrestError } from '@supabase/supabase-js';
import { useGetDefaultsTabsId } from './useGetDefaultsTabsId';
import { useHandleTabGroups } from './useHandleTabGroups';
import { useHandleTabsToCreate } from './useHandleTabsToCreate';

export const useSaveTabs = () => {
    const { user } = useAuthState();
    const { getDefaultsTabsId } = useGetDefaultsTabsId();
    const { handleTabGroups } = useHandleTabGroups();
    const { handleTabsToCreate } = useHandleTabsToCreate();
    const { callApi: fetchUpdateTabs } = useFetchWithCallback();
    const { callApi: fetchCreateTabs } = useFetchWithCallback();

    /**
     * Get The currentChromeTabs and the defaults tabs ids of the user.
     * Create the groups of the tabs if not exist, and then
     * find the unique tabs and the tabs duplicated,
     * if the user wants can update the tabs
     */
    const saveTabs = async (currentChromeTabs: chrome.tabs.Tab[] = []) => {
        if (!currentChromeTabs || !user) return;

        const errorInHandleTabGroups = await handleTabGroups(currentChromeTabs);

        if (errorInHandleTabGroups) {
            console.log('Ops.. something went wrong, Please try again later.');
            return;
        }

        const { defaults, error: defaultIdsError } = await getDefaultsTabsId();

        if (defaultIdsError ?? !defaults) return;

        const currentTabs = chromeTabsToTabsSupabase(currentChromeTabs, user, defaults);

        const { tabsFiltered, structOfTabsToUpdate, errorInReadTabs } = await handleTabsToCreate(currentTabs);

        if (errorInReadTabs) {
            console.log('Ops... Something went wrong, Please try again later.');
            return;
        }

        let requestForOverWrite: Array<Promise<any>> = [];

        if (tabsFiltered.length === 0) {
            console.log('Ops... The Tab/s selected already exist.');
            return;
        }

        if (structOfTabsToUpdate && structOfTabsToUpdate.length > 0) {
            const confirmedOverWrite = confirm('There are some tabs already saved do you want to update them?.');
            if (!confirmedOverWrite) return;

            // eslint-disable-next-line @typescript-eslint/return-await
            requestForOverWrite = structOfTabsToUpdate.map(async ({ fetchFunc, data }) => fetchUpdateTabs(fetchFunc, data));
        }

        const funcToCreateTabs = () => tabsFiltered.length === 0
            ? []
            : fetchCreateTabs(createTabs, tabsFiltered);

        const results = await Promise.all([funcToCreateTabs(), ...requestForOverWrite]);

        const msgErrors: PostgrestError[] = [];

        results.forEach((result: SupabaseCommonResponse) => {
            if (result.error) {
                msgErrors.push(result.error);
            }
        });

        if (msgErrors.length > 0) console.log('Results All: ', msgErrors);
    };

    return { saveTabs };
};
