import { AuthUser } from '@/contexts/auth';
import { readDefaultGroup, readDefaultSession } from '@/services/tabs';
import { createTab } from '@/services/tabs/tab/createTab';
import { getActiveTab } from '@/utils/chrome/getActiveTab';
import { createTabsForSupabase } from '@/utils/tabs/createTabsSupabase';

/**
 * It gets the active tab, gets the default group and session Ids, creates a tab object with the defaults,
 * and then creates the tab in the database
 * @param {AuthUser | undefined} user - AuthUser | undefined
 * @returns Promise `void`.
 */
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

    const tabs = createTabsForSupabase([activeTab], user, defaults);

    const { error } = await createTab(tabs);

    if (error) {
        console.log(error.code === '23505' ? 'Tab is already saved.' : error.message);
    }
};
