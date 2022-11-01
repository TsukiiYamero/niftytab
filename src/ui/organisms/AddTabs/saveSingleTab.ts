import { AuthUser } from '@/contexts/auth';
import { createTab } from '@/services/tabs/tab/createTab';
import { getActiveTab } from '@/utils/chrome/getActiveTab';
import { createTabsForSupabase } from '@/utils/tabs/createTabsSupabase';
import { filterUniqueTabsForSupabase } from './filterUniqueTabsForSupabase';
import { handleDefaultTabsIds } from './handleDefaultTabsIds';

/**
 * It gets the active tab, gets the default group and session Ids, creates a tab object with the defaults,
 * and then creates the tab in the database if not exist already
 * @param {AuthUser | undefined} user - AuthUser | undefined
 * @returns Promise `void`.
 */
export const saveSingleTab = async (user: AuthUser | undefined) => {
    const activeTab = await getActiveTab();

    if (!activeTab || !user) return;

    const { defaults, error: defaultIdsError } = await handleDefaultTabsIds();

    if (defaultIdsError ?? !defaults) {
        console.log(defaultIdsError);
        return;
    };

    const tabs = createTabsForSupabase([activeTab], user, defaults);

    const { tabs: tabsFiltered, error: errorInFilteredTabs } = await filterUniqueTabsForSupabase(tabs);

    if (errorInFilteredTabs) {
        console.log(errorInFilteredTabs);
        return true;
    }

    const { error } = await createTab(tabsFiltered);

    if (error) {
        console.log(error.code === '23505' ? 'Tab is already saved.' : error.message);
    }
};
