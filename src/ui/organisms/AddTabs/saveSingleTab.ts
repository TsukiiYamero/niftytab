import { AuthUser } from '@/contexts/auth';
import { createTabs, updateTabs } from '@/services/tabs';
import { getActiveTab } from '@/utils/chrome/getActiveTab';
import { chromeTabsToTabsSupabase } from '@/utils/tabs/createTabsSupabase';
import { handleDuplicateTabs } from './filterUniqueTabsForSupabase';
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

    const tabs = chromeTabsToTabsSupabase([activeTab], user, defaults);

    const { tabsFiltered, tabsForOverWrite, error: errorInFilteredTabs } = await handleDuplicateTabs(tabs);

    if (errorInFilteredTabs) {
        console.log(errorInFilteredTabs);
        return;
    }

    const supabaseActions: any[] = [];

    if (tabsForOverWrite.length > 0) {
        const confirmedOverWrite = confirm('Some Tabs already exist, do you want to overwrite them?.');
        if (!confirmedOverWrite) return;

        tabsForOverWrite.forEach(tab => {
            supabaseActions.push({ fetch: updateTabs, data: tab });
        });
        console.log('supabaseActions: ', supabaseActions);

        const requestForOverWrite: Array<Promise<any>> = supabaseActions.map((struc: { fetch: (data: any) => any, data: any }) => {
            console.log('fetch: ', struc.data);
            // eslint-disable-next-line @typescript-eslint/return-await
            return struc.fetch(struc.data);
        });

        const results = await Promise.all(requestForOverWrite);

        if (results[0].error) {
            console.log('Ops... Something went wrong with update,', results[0].error);
        }

        return;
    }

    if (tabsFiltered.length === 0 && tabsForOverWrite.length === 0) {
        console.log('Ops... The Tab/s selected already exist.');
        return;
    }

    const { error } = await createTabs(tabsFiltered);

    if (error) {
        console.log(error.message);
    }
};
