import { TabsSupabase } from '@/models';
import { readTabs } from '@/services/tabs';
import { abortController } from '@/utils/abortController';

/**
 * Filters the tabs that are already in the database `tabsInSupabase` with the `tabs` given,
 * if there are tabs with different url then return in `tabsForOverWrite`
 * @param {chrome.tabs.Tab[]} tabs
 */
export const handleDuplicateTabs = async (tabs: TabsSupabase[] = []) => {
    const { data: tabsInSupabase, error: errorInReadTabs } = await readTabs().fetchFunc(abortController());
    const tabsForOverWrite: TabsSupabase[] = [];

    if (errorInReadTabs) {
        return {
            tabsFiltered: [],
            tabsForOverWrite: [],
            error: 'Something went wrong, please try again later.'
        };
    }

    const tabsFiltered = tabs.filter(tab =>
        !tabsInSupabase.find((tabSupabase: TabsSupabase) => {
            const isSameId = tabSupabase.id === tab.id;

            if (isSameId && tabSupabase.url !== tab.url) {
                tabsForOverWrite.push(tab);
            }
            return isSameId;
        }));

    if (tabsFiltered.length === 0) {
        return {
            tabsFiltered: [],
            tabsForOverWrite,
            error: ''
        };
    }

    return {
        tabsFiltered,
        tabsForOverWrite,
        error: null
    };
};
