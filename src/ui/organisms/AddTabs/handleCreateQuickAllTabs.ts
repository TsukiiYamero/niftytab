import { AuthUser } from '@/contexts/auth';
import { createAllTabs } from '@/services/tabs';
import { getAllChromeTabs } from '@/utils/chrome';
import { createTabsForSupabase } from '@/utils/tabs/createTabsSupabase';
import { handleDefaultsIds } from './handleDefaultsIds';

export const handleCreateQuickAllTabs = async (user: AuthUser | undefined) => {
    const activeTabs = await getAllChromeTabs();

    if (!activeTabs || !user) return;

    const { defaults, error: defaultIdsError } = await handleDefaultsIds();

    if (defaultIdsError ?? !defaults) {
        console.log(defaultIdsError);
        return;
    };

    const tabs = createTabsForSupabase(activeTabs, user, defaults);

    const { error } = await createAllTabs(tabs);

    if (error) {
        console.log(error.code === '23505' ? 'Tab is already saved.' : error.message);
    }
};
