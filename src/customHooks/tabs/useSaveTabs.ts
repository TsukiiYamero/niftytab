import { useAuthState } from '@/contexts/auth';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { createTabs } from '@/services/tabs';
import { chromeTabsToTabsSupabase } from '@/utils/tabs/createTabsSupabase';
import { useGetDefaultUserIds } from './useGetDefaultsTabsId';
import { useHandleTabGroups } from './useHandleTabGroups';
import { useHandleTabsToCreate } from './useHandleTabsToCreate';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsActions } from '@/contexts/tabs';
import { supabaseTabsToNiftyTabs } from '@/utils/tabs';

export const useSaveTabs = () => {
    const { user } = useAuthState();
    const { saved } = useGetTabsContext();
    const { getDefaultUserIds } = useGetDefaultUserIds();
    const { createTabGroupsIfNotExist } = useHandleTabGroups();
    const { getTabsFiltered } = useHandleTabsToCreate();
    const { callApi: fetchCreateTabs } = useFetchWithCallback();
    const dispatch = useTabsDispatch();

    /**
     * Create the groups of the tabs if not exist this should to be before to save tabs
     * find unique tabs and validate if its not saved already,
     * then save the tabs, if saved successfully dispatch an update for tabs store
     */
    const saveTabs = async (currentChromeTabs: chrome.tabs.Tab[] = []) => {
        if (!currentChromeTabs || !user) return;

        const errorInHandleTabGroups = await createTabGroupsIfNotExist(currentChromeTabs);

        if (errorInHandleTabGroups) {
            console.log('Ops.. something went wrong, Please try again later.');
            return;
        }

        const { defaultsIds, error: defaultIdsError } = await getDefaultUserIds();
        if (defaultIdsError ?? !defaultsIds) return;

        const currentTabs = chromeTabsToTabsSupabase(currentChromeTabs, user, defaultsIds);
        const { tabsFiltered, errorInReadTabs } = await getTabsFiltered(currentTabs);

        if (errorInReadTabs) {
            console.log('Ops... Something went wrong, Please try again later.');
            return;
        }

        if (tabsFiltered.length === 0) {
            console.log('Ops... The Tab/s selected already exist.');
            return;
        }

        const result = await fetchCreateTabs(createTabs, tabsFiltered);

        if (result.error) {
            console.log('Results All: ', result.error);
            return;
        }

        const tabsCreated = supabaseTabsToNiftyTabs(tabsFiltered);

        dispatch({ type: TabsActions.updatedSaved, payload: [...saved, ...tabsCreated] ?? [] });
        console.log('Saved Successfully');
    };

    return { saveTabs };
};
