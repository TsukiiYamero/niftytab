import { NiftyTab, TabsSupabase } from '@/models';

export const supabaseTabsToNiftyTabs = (tabs: TabsSupabase[] = []): NiftyTab[] => {
    return tabs.map((tab) => ({
        active: tab.active,
        discarded: tab.discarded,
        favIconUrl: tab.favicon_url,
        groupId: tab.group_id,
        refererId: tab.referer_id,
        index: tab.index,
        pinned: tab.pinned,
        sessionId: tab.session_id,
        title: tab.title,
        url: tab.url
    }));
};

/**
 * this function is used to listings the tabs Local
 * the refererId here is fake just for key in ul
 */
export const chromeTabsToNiftyTabs = (tabs: chrome.tabs.Tab[] = []): NiftyTab[] => {
    return tabs.map((tab) => ({
        active: tab.active,
        discarded: tab.discarded,
        groupId: tab.groupId,
        index: tab.index,
        pinned: tab.pinned,
        sessionId: 0,
        favIconUrl: tab.favIconUrl ?? '',
        refererId: `${tab.url}${tab.id}`,
        title: tab.title ?? '',
        url: tab.url ?? ''
    }));
};
