import { supabase } from '@/api/config';
import { GroupsTabsSupabase } from '@/models';
import { DEFAULT_GROUP_NAME, SUPABASE_TABLE_GROUPS } from '../tabs.statics';

export const createGroup = async (group: GroupsTabsSupabase[] = []) => {
    if (group.length === 0) return {
        data: [],
        error: null
    };

    const { data, error } = await supabase
        .from(SUPABASE_TABLE_GROUPS)
        .insert(group);

    return { data, error };
};

export const createDefaultGroup = async (userId: string) => {
    const defaultGroup: GroupsTabsSupabase = {
        collapsed: false,
        title: DEFAULT_GROUP_NAME,
        user_id: userId
    };

    createGroup([defaultGroup]);
};
