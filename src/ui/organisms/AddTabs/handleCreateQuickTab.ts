import { AuthUser } from '@/contexts/auth';
import { TabsSupabase } from '@/models';
import { readDefaultGroup, readDefaultSession } from '@/services/tabs';
import { createTab } from '@/services/tabs/createTab';
import { getActiveTab } from '@/utils/chrome/getActiveTab';

export const handleCreateQuickTab = async (user: AuthUser | undefined) => {
    const activeTab = await getActiveTab();

    if (!activeTab || !user) return;

    const groupDefault = await readDefaultGroup();
    const sessionDefault = await readDefaultSession();

    if (groupDefault.error) {
        console.error(groupDefault.error?.message);
        return;
    }

    if (sessionDefault.error) {
        console.error(sessionDefault.error?.message);
        return;
    }

    const defaults = {
        groupId: groupDefault.data[0]?.id ?? 1,
        sessionId: sessionDefault.data[0]?.id ?? 1
    };

    const infoForCrateTab: TabsSupabase = {
        active: activeTab.active,
        discarded: activeTab.discarded,
        favicon_url: activeTab.favIconUrl ?? '',
        group_id: activeTab.groupId === -1 ? defaults.groupId : activeTab.groupId,
        index: activeTab.index,
        pinned: activeTab.pinned,
        session_id: defaults.sessionId,
        title: activeTab.title ?? '',
        url: activeTab.url ?? '',
        id: activeTab.id,
        user_id: user?.id
    };

    const { error } = await createTab(infoForCrateTab);

    if (error) {
        console.log(error.code === '23505' ? 'Tab is already saved.' : error.message);
    }
};
