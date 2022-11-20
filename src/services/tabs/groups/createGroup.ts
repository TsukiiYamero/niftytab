import { supabase } from '@/api/config';
import { GroupsTabsSupabase } from '@/models';
import { DEFAULT_GROUP_NAME, SUPABASE_TABLE_GROUPS } from '../tabs.statics';

export const createGroup = (controller: AbortController, group: GroupsTabsSupabase[] = []) => {
    return supabase
        .from(SUPABASE_TABLE_GROUPS)
        .insert(group)
        .abortSignal(controller.signal);
};

export const createDefaultGroup = (controller: AbortController, userId: string) => {
    const defaultGroup: GroupsTabsSupabase = {
        collapsed: false,
        title: DEFAULT_GROUP_NAME,
        user_id: userId
    };

    return createGroup(controller, [defaultGroup]);
};
