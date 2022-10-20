import { AuthUser } from '@/contexts/auth';
import { TabsSupabase } from '@/models';

export const createTabsSupabase = (tabs: chrome.tabs.Tab[], user: AuthUser | undefined, defaults: { groupId: number, sessionId: number }) => {
    if (!tabs || !user) return [];

    const tabsForSave: TabsSupabase[] = [];

    tabs.forEach(tab => {
        const infoForCrateTab: TabsSupabase = {
            active: tab.active,
            discarded: tab.discarded,
            favicon_url: tab.favIconUrl ?? '',
            group_id: tab.groupId === -1 ? defaults.groupId : tab.groupId,
            index: tab.index,
            pinned: tab.pinned,
            session_id: defaults.sessionId,
            title: tab.title ?? '',
            url: tab.url ?? '',
            id: tab.id,
            user_id: user.id
        };

        tabsForSave.push(infoForCrateTab);
    });

    return tabsForSave;
};
