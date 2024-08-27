import { suspendTab } from './chrome';

/**
 * Sort tabs by last accessed time
 * @param tabs
 * @returns tabs sorted by last accessed time
 */
export const sortTabsByLastAccessed = (tabs: chrome.tabs.Tab[]) => {
    if (!tabs) return [];

    const tabsLastAccess = tabs.sort((a, b) => {
        const aLastAccessed = a.lastAccessed ?? 0;
        const bLastAccessed = b.lastAccessed ?? 0;
        return bLastAccessed - aLastAccessed;
    });

    return tabsLastAccess;
};

/**
 * Filter tabs that are playing video or audio
 * @param tabs
 * @returns tabs without video or audio
 */
export const excludeMediaTabs = (tabs: chrome.tabs.Tab[]) => {
    if (!tabs) return [];

    return tabs.filter((tab) => {
        if (!tab.id) return false;

        return !tab.audible;
    });
};

/**
 * Filter tabs that user want to exclude
 * @param tabs
 * @param excludeByUser
 * @returns tabs without user
 */
export const excludeTabsByUser = (tabs: chrome.tabs.Tab[], excludeByUser: string[]) => {
    if (!tabs) return [];

    return tabs.filter((tab) => {
        if (!tab.id) return false;

        return !excludeByUser.includes(tab.url ?? '');
    });
};

/**
 * #### Suspend tabs in chrome
 * @param tabs 
 * @returns number of tabs suspended
 */
export const suspendTabs = async (tabs: chrome.tabs.Tab[]) => {
    const suspendedTabsPromises: Array<Promise<chrome.tabs.Tab>> = [];
    let suspended = 0;

    tabs.forEach((tab) => {
        if (!tab.id) return;
        suspendedTabsPromises.push(suspendTab(tab.id));
    });

    const suspendedTabs = await Promise.allSettled(suspendedTabsPromises);

    suspendedTabs.forEach((tab) => {
        if (tab.status === 'fulfilled') suspended++;
    });

    return suspended;
};
