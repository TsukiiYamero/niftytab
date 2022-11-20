import { TabsSupabase } from '@/models';

/**
 * Filters the tabs that are already in the database `tabsInSupabase` with the `tabs` given,
 * and if there are same tabs with different url then return it
 * @param {chrome.tabs.Tab[]} tabs - tabs from browser
 * @param {TabsSupabase} tabsInSupabase tabs from supabase
 * @return `tabsFiltered` tabs that are not in the database
 * @return `tabsForOverWrite` tabs that are in the database but with different url
 */
export const handleDuplicateTabs = async (tabs: TabsSupabase[] = [], tabsInSupabase: TabsSupabase[] = []) => {
    const tabsForOverWrite: TabsSupabase[] = [];

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
            tabsForOverWrite
        };
    }

    return {
        tabsFiltered,
        tabsForOverWrite
    };
};
