/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthUser } from '@/contexts/auth';
import { GroupsTabsSupabase, SupabaseCommonResponse, TabsSupabase } from '@/models';
import { createTabs, createGroup, readTabs, updateTabs } from '@/services/tabs';
import { abortController } from '@/utils/abortController';
import { getAllChromeTabs } from '@/utils/chrome';
import { chromeTabsToTabsSupabase } from '@/utils/tabs/createTabsSupabase';
import { PostgrestError } from '@supabase/supabase-js';
import { handleDuplicateTabs } from './filterUniqueTabsForSupabase';
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

    const tabs = chromeTabsToTabsSupabase(currentChromeTabs, user, defaults);

    const { tabsFiltered, tabsForOverWrite, error: errorInFilteredTabs } = await handleDuplicateTabs(tabs);

    if (errorInFilteredTabs) {
        console.log(errorInFilteredTabs);
        return true;
    }

    const supabaseActions: any[] = [];

    if (tabsForOverWrite.length > 0) {
        const confirmedOverWrite = confirm('There are some tabs already saved do you want to overwrite them?.');

        if (confirmedOverWrite) {
            tabsForOverWrite.forEach(tab => {
                supabaseActions.push({ fetch: updateTabs, data: tab });
            });
            console.log('supabaseActions: ', supabaseActions);
        }
    }

    const requestForOverWrite: Array<Promise<any>> = supabaseActions.map((struc: { fetch: (data: any) => any, data: any }) => {
        console.log('fetch: ', struc.data);
        // eslint-disable-next-line @typescript-eslint/return-await
        return struc.fetch(struc.data);
    });

    if (tabsFiltered.length === 0 && tabsForOverWrite.length === 0) {
        console.log('Ops... The Tab/s selected already exist.');
        return false;
    }

    const funcToCreateTabs = () => {
        if (tabsFiltered.length === 0) return [];

        return createTabs(tabsFiltered);
    };

    const results = await Promise.all([funcToCreateTabs(), ...requestForOverWrite]);

    const msgErrors: PostgrestError[] = [];

    results.forEach((result: SupabaseCommonResponse) => {
        if (result.error) {
            msgErrors.push(result.error);
        }
    });

    if (msgErrors.length > 0) {
        console.log('Results All: ', msgErrors);
        return false;
    }

    return true;

    /* const { error } = await createTabs(tabsFiltered);

    if (error) {
        console.log(error.code === '23505' ? 'Some Tabs are already saved.' : error.message);
        return true;
    }

    return false; */
};
