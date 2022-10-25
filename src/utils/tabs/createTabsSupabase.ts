import { AuthUser } from '@/contexts/auth';
import { TabsSupabase } from '@/models';

/**
 * Create the tabs structure for save in supabase Tabs
 * @param tabs
 * @param user
 * @param defaults
 * @returns
 */
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
            // id 0 because i will never touch sessions, so always id will exist
            id: tab.id ?? 0,
            user_id: user.id
        };

        tabsForSave.push(infoForCrateTab);
    });

    return tabsForSave;
};
