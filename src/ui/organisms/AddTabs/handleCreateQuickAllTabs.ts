import { AuthUser } from '@/contexts/auth';
import { createAllTabs, readDefaultGroup, readDefaultSession } from '@/services/tabs';
import { getAllChromeTabs } from '@/utils/chrome';
import { createTabsForSupabase } from '@/utils/tabs/createTabsSupabase';

export const handleCreateQuickTabs = async (user: AuthUser | undefined) => {
    const activeTabs = await getAllChromeTabs();

    if (!activeTabs || !user) return;

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

    console.log(activeTabs);

    const defaults = {
        groupId: groupDefault.data[0]?.id ?? 1,
        sessionId: sessionDefault.data[0]?.id ?? 1
    };

    const tabs = createTabsForSupabase(activeTabs, user, defaults);

    const { error } = await createAllTabs(tabs);

    if (error) {
        console.log(error.code === '23505' ? 'Tab is already saved.' : error.message);
    }
};
