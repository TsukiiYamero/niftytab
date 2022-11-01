import { TabsSupabase } from '@/models';
import { readTabs } from '@/services/tabs';
import { abortController } from '@/utils/abortController';

/**
 * It filters the tabs that are already in the database `tabsInSupabase` with the `tabs`
 * @param {chrome.tabs.Tab[]} tabs
 */
export const filterUniqueTabsForSupabase = async (tabs: TabsSupabase[] = []) => {
    const { data: tabsInSupabase, error: errorInReadTabs } = await readTabs().fetchFunc(abortController());

    if (errorInReadTabs) {
        return {
            tabs: [],
            error: 'Something went wrong, please try again later.'
        };
    }

    console.log(tabsInSupabase);
    console.log(tabs);

    const tabsFiltered = tabs.filter(tab =>
        !tabsInSupabase.find((tabSupabase: TabsSupabase) => tabSupabase.id === tab.id));

    if (tabsFiltered.length === 0) {
        return {
            tabs: [],
            error: 'Ops... The Tabs selected already exist.'
        };
    }

    return {
        tabs: tabsFiltered,
        error: null
    };
};
