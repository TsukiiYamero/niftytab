import { useAuthState } from '@/contexts/auth';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { GroupsTabsSupabase } from '@/models';
import { createGroup } from '@/services/tabs';
import { useGetAllTabGroups } from './useGetAllTabsGroups';

export const useHandleTabGroups = () => {
    const { user } = useAuthState();
    const { getAllTabGroups } = useGetAllTabGroups();
    const { callApi: fetchCreateGroups } = useFetchWithCallback();

    /**
     * If the group id of the tab doesn't exist in the database then it will be created.
     * Tip: Always should be created the group then save tabs
     * @returns errorInHandleTabGroups
     */
    const handleTabGroups = async (tabs: chrome.tabs.Tab[] = []) => {
        const allGroups = await getAllTabGroups();
        const groupsToCreate: GroupsTabsSupabase[] = [];

        if (!user || allGroups.length === 0) return true;

        tabs.forEach(tab => {
            if (tab.groupId === -1) return;

            const existGroupId = allGroups.find(group => group.id === tab.groupId);
            if (existGroupId) return;

            const existInGroupsToCreate = groupsToCreate.find(group => group.id === tab.groupId);
            if (!existInGroupsToCreate) groupsToCreate.push({
                collapsed: true,
                user_id: user.id,
                id: tab.groupId,
                title: tab.title
            });
        });

        const { error: errorInCreateGroups } = await fetchCreateGroups(createGroup, groupsToCreate);

        return !!errorInCreateGroups;
    };

    return { handleTabGroups };
};
