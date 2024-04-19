import { getAllBrowserTabs, suspendTab } from '@/utils/chrome';

/**
 * `autoSuspendTabs` suspends a specified number of least recently accessed browser tabs.
 * @param {number} excludeRecentTabs - The `excludeRecentTabs` parameter in the `autoSuspendTabs`
 * function determines the number of most recently accessed tabs that should be excluded from
 * suspension. These tabs will not be suspended even if they are eligible based on the sorting of tabs
 * by last accessed time.
 * @returns The function `autoSuspendTabs` returns the number of tabs that were successfully suspended.
 */
export const autoSuspendTabs = async (excludeRecentTabs: number) => {
    const tabs = await getAllBrowserTabs();

    const recentTabs = tabs.sort((a, b) => {
        const aLastAccessed = a.lastAccessed ?? 0;
        const bLastAccessed = b.lastAccessed ?? 0;
        return bLastAccessed - aLastAccessed;
    });

    const tabsToSuspend = recentTabs.slice(0, excludeRecentTabs);

    const suspendedTabsPromises: Array<Promise<chrome.tabs.Tab>> = [];
    let suspended = 0;

    tabsToSuspend.forEach((tab) => {
        if (!tab.id) return;
        suspendedTabsPromises.push(suspendTab(tab.id));
    });

    const suspendedTabs = await Promise.all(suspendedTabsPromises);

    suspendedTabs.forEach((tab) => {
        if (tab) suspended++;
    });

    return suspended;
};
