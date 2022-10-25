import { NiftyTab, TabsSupabase } from '@/models';

export const supabaseTabsToNiftyTabs = (tabs: TabsSupabase[] = []): NiftyTab[] => {
    return tabs.map((tab) => ({
        active: tab.active,
        discarded: tab.discarded,
        favIconUrl: tab.favicon_url,
        groupId: tab.group_id,
        id: tab.id,
        index: tab.index,
        pinned: tab.pinned,
        sessionId: tab.session_id,
        title: tab.title,
        url: tab.url
    }));
};

export const chromeTabsToNiftyTabs = (tabs: chrome.tabs.Tab[] = []): NiftyTab[] => {
    return tabs.map((tab, i) => ({
        active: tab.active,
        discarded: tab.discarded,
        groupId: tab.groupId,
        index: tab.index,
        pinned: tab.pinned,
        sessionId: 0,
        favIconUrl: tab.favIconUrl ?? '',
        id: tab.id ?? (i + Math.floor(Math.random() * 100000)),
        title: tab.title ?? '',
        url: tab.url ?? ''
    }));
};
