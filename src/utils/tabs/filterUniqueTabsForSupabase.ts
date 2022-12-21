import { TabsSupabase } from '@/models';

/**
 * Filters the tabs that are already in the database `tabsInSupabase` with the `tabs` given
 * and remove the registers duplicated
 * @param {chrome.tabs.Tab[]} tabs - tabs from browser
 * @param {TabsSupabase} tabsInSupabase tabs from supabase
 * @return `tabsFiltered` tabs that are not in the database
 * @return `tabsForOverWrite` tabs that are in the database but with different url
 */
export const handleUniqueTabs = async (tabs: TabsSupabase[] = [], tabsInSupabase: TabsSupabase[] = []) => {
    const tabsFiltered = tabs.filter(tab =>
        !tabsInSupabase.find((tabSupabase: TabsSupabase) => tabSupabase.referer_id === tab.referer_id));

    if (tabsFiltered.length === 0) {
        return [];
    }

    const uniqueIds = new Set();

    const uniqueTabsFiltered = tabsFiltered.filter(tab => {
        if (!uniqueIds.has(tab.url)) {
            uniqueIds.add(tab.url);
            return true;
        }
        return false;
    });

    return uniqueTabsFiltered;
};
