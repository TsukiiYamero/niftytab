import { useAuthState } from '@/contexts/auth';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { createTabs } from '@/services/tabs';
import { chromeTabsToTabsSupabase } from '@/utils/tabs/createTabsSupabase';
import { useHandleTabGroups } from './useHandleTabGroups';
import { useHandleTabsToCreate } from './useHandleTabsToCreate';
import { supabaseTabsToNiftyTabs } from '@/utils/tabs';
import { useSnackbar } from '@/contexts/snackbar/hooks';
import { ERROR_MESSAGE, INFO_MESSAGE } from '@/utils/commonMsg';

export const useSaveTabs = () => {
    const { user } = useAuthState();
    const { createTabGroupsIfNotExist } = useHandleTabGroups();
    const { getTabsFiltered } = useHandleTabsToCreate();
    const { callApi: fetchCreateTabs } = useFetchWithCallback();
    const showSnackbar = useSnackbar();

    /**
     * Create the groups of the tabs if not exist this should to be before to save tabs
     * find unique tabs and validate if its not saved already,
     * then save the tabs, if saved successfully dispatch an update for tabs store
     */
    const saveTabs = async (
        currentChromeTabs: chrome.tabs.Tab[] = [],
        { sessionId, groupId }: { sessionId: number, groupId: number }
    ) => {
        if (!currentChromeTabs || !user) return [];

        const errorInHandleTabGroups = await createTabGroupsIfNotExist(currentChromeTabs);

        if (errorInHandleTabGroups) {
            showSnackbar(ERROR_MESSAGE, 'error');
            return [];
        }

        const currentTabs = chromeTabsToTabsSupabase(currentChromeTabs, user, { sessionId, groupId });
        const { tabsFiltered, errorInReadTabs } = await getTabsFiltered(currentTabs);

        if (errorInReadTabs) {
            showSnackbar(ERROR_MESSAGE, 'error');
            return [];
        }

        if (tabsFiltered.length === 0) {
            showSnackbar(INFO_MESSAGE, 'warning');
            return [];
        }

        const result = await fetchCreateTabs(createTabs, tabsFiltered);

        if (result.error) {
            showSnackbar(ERROR_MESSAGE, 'error');
            console.error('Results All: ', result.error);
            return [];
        }

        const tabsCreated = supabaseTabsToNiftyTabs(tabsFiltered);
        return tabsCreated;
    };

    return { saveTabs };
};
