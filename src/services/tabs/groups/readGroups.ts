import { supabase } from '@/api/config';
import { GroupsTabsSupabase } from '@/models';
import { DEFAULT_GROUP_NAME, SUPABASE_TABLE_GROUPS } from '../tabs.statics';
import { ReadGroupsWithFiltering2 } from '../tabs.types';

export const readGroups = async () => {
    const { data: groups, error } = await supabase
        .from(SUPABASE_TABLE_GROUPS)
        .select('*');

    return { data: groups, error };
};

export const readGroupsWithFilter = async (filter: ReadGroupsWithFiltering2) => {
    const { data: groups, error } = await supabase
        .from(SUPABASE_TABLE_GROUPS)
        .select('*').eq(filter.eq.column ?? '', filter.eq.equalTo ?? '');

    return { data: groups as GroupsTabsSupabase[], error };
};

export const readDefaultGroup = async () => {
    return await readGroupsWithFilter({
        eq: {
            column: 'title',
            equalTo: DEFAULT_GROUP_NAME
        }
    });
};
