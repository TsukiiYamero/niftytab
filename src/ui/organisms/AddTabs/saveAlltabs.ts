/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthUser } from '@/contexts/auth';
import { GroupsTabsSupabase, TabsSupabase } from '@/models';
import { createAllTabs, createGroup, readTabs } from '@/services/tabs';
import { abortController } from '@/utils/abortController';
import { getAllChromeTabs } from '@/utils/chrome';
import { createTabsForSupabase } from '@/utils/tabs/createTabsSupabase';
import { filterUniqueTabsForSupabase } from './filterUniqueTabsForSupabase';
import { getAllTabGroups } from './getAllTabGroups';
import { handleDefaultTabsIds } from './handleDefaultTabsIds';

export const saveAllTabs = async (user: AuthUser | undefined): Promise<boolean> => {
    const currentChromeTabs = await getAllChromeTabs();

    if (!currentChromeTabs || !user) return true;

    const { defaults, error: defaultIdsError } = await handleDefaultTabsIds();

    if (defaultIdsError ?? !defaults) {
        console.log(defaultIdsError);
        return true;
    };

    const allGroups = await getAllTabGroups();
    const groupsToCreate: GroupsTabsSupabase[] = [];

    currentChromeTabs.forEach(tab => {
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

    const { error: errorInCreateGroups } = await createGroup(groupsToCreate);

    if (errorInCreateGroups) {
        console.log(errorInCreateGroups.message, ' Please try again later.');
        return true;
    }

    const tabs = createTabsForSupabase(currentChromeTabs, user, defaults);

    const { tabs: tabsFiltered, error: errorInFilteredTabs } = await filterUniqueTabsForSupabase(tabs);

    if (errorInFilteredTabs) {
        console.log(errorInFilteredTabs);
        return true;
    }

    const { error } = await createAllTabs(tabsFiltered);

    if (error) {
        console.log(error.code === '23505' ? 'Some Tabs are already saved.' : error.message);
        return true;
    }

    return false;
};
