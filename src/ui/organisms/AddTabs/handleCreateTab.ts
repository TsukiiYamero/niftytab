import { AuthUser } from '@/contexts/auth';
import { TabsSupabase } from '@/models';
import { createTab } from '@/services/tabs/createTab';
import { getActiveTab } from '@/utils/chrome/getActiveTab';

export const handleCreateTab = async (user: AuthUser | undefined) => {
    const activeTab = await getActiveTab();
    if (!activeTab || !user) return;

    const infoForCrateTab: TabsSupabase = {
        active: activeTab.active,
        discarded: activeTab.discarded,
        favicon_url: activeTab.favIconUrl ?? '',
        group_id: 1,
        index: activeTab.index,
        pinned: activeTab.pinned,
        session_id: 1,
        title: activeTab.title ?? '',
        url: activeTab.url ?? '',
        user_id: user?.id
    };

    const { data, error } = await createTab(infoForCrateTab);

    if (error) {
        console.log(error);
        return;
    }

    /* Tab Saved, show a toast notification */
    console.log(data);
};
