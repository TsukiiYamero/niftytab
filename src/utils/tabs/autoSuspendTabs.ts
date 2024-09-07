import { getAllBrowserTabs } from '@/utils/chrome';
import { excludeMediaTabs, excludeTabsByUser, sortTabsByLastAccessed, suspendTabs } from '../tabs';

/**
 * `autoSuspendTabs` suspends a specified number of least recently accessed browser tabs.
 * @param {number} excludeRecentTabs - The `excludeRecentTabs` parameter in the `autoSuspendTabs`
 * function determines the number of most recently accessed tabs that should be excluded from
 * suspension. These tabs will not be suspended even if they are eligible based on the sorting of tabs
 * by last accessed time.
 * @returns The function `autoSuspendTabs` returns the number of tabs that were successfully suspended.
 */
export const autoSuspendTabs = async (
    excludeRecentTabs: number,
    excludeMedia: boolean,
    excludeByUser: string[]
) => {
    const tabs = await getAllBrowserTabs();
    const tabsToSuspend = filterTabsByConditions(tabs, excludeRecentTabs, excludeMedia, excludeByUser);

    // cantidad de tabs suspendidos
    const tabsSuspended = await suspendTabs(tabsToSuspend);
    return tabsSuspended;
};

/**
 * #### Filters an array of Chrome tabs based on specified conditions.
 * 
 * @param {chrome.tabs.Tab[]} tabs - array of Chrome tab that you
 * want to filter based on certain conditions.
 * @param {number} excludeNRecentTabs - number that determines
 * how many of the most recent tabs should be excluded from the filtering process.
 * @param {boolean} isMediaExclude - determines whether tabs playing audio or video should be excluded
 * from the final list of tabs to suspend.
 * @param {string[]} excludeByUser - array of strings that represents the users for whom certain 
 * tabs should be excluded from suspension.
 * @returns returning a filtered array of tabs that meet the specified conditions by params.
 */
export const filterTabsByConditions = (
    tabs: chrome.tabs.Tab[],
    excludeNRecentTabs: number,
    isMediaExclude: boolean,
    excludeByUser: string[]
) => {
    let tabsToSuspend: chrome.tabs.Tab[] = [];
    /* Ordenar tabs de mas reciente a mas antiguo */
    const tabsOrderedLastAccess = sortTabsByLastAccessed(tabs);
    tabsToSuspend = tabsOrderedLastAccess.slice(excludeNRecentTabs);

    /* Remover tabs que reproducen audio o video */
    if (isMediaExclude) {
        tabsToSuspend = excludeMediaTabs(tabsToSuspend);
    }

    /* Remover tabs que el usuario no quiere suspender */
    if (excludeByUser.length > 0) {
        tabsToSuspend = excludeTabsByUser(tabsToSuspend, excludeByUser);
    }

    return tabsToSuspend;
};
