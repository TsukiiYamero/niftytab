import { supabase } from '@/api/config';
import { GroupsTabsSupabase } from '@/models';
import { DEFAULT_GROUP_NAME, SUPABASE_TABLE_GROUPS } from '../tabs.statics';
import { ReadGroupsWithFiltering2 } from '../tabs.types';

export const ReadGroups = async () => {
    const { data: groups, error } = await supabase
        .from(SUPABASE_TABLE_GROUPS)
        .select('*');

    return { data: groups, error };
};

export const ReadGroupsWithFilter = async (filter: ReadGroupsWithFiltering2) => {
    const { data: groups, error } = await supabase
        .from(SUPABASE_TABLE_GROUPS)
        .select('*').eq(filter.eq.column ?? '', filter.eq.equalTo ?? '');

    return { data: groups as GroupsTabsSupabase[], error };
};

export const readDefaultGroup = async () => {
    return await ReadGroupsWithFilter({
        eq: {
            column: 'title',
            equalTo: DEFAULT_GROUP_NAME
        }
    });
};
