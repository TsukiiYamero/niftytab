import { supabase } from '@/api/config';
import { DEFAULT_GROUP_NAME } from '../tabs.statics';
import { ReadGroupsWithFiltering2 } from '../tabs.types';

export const ReadGroups = async () => {
    const { data: groups, error } = await supabase
        .from('groups')
        .select('*');

    return { data: groups, error };
};

export const ReadGroupsWithFilter = async (filter: ReadGroupsWithFiltering2) => {
    const { data: groups, error } = await supabase
        .from('groups')
        .select('*').eq(filter.eq.column ?? '', filter.eq.EqualTo ?? '');

    return { data: groups, error };
};

export const readDefaultGroup = async () => {
    return await ReadGroupsWithFilter({
        eq: {
            column: 'title',
            EqualTo: DEFAULT_GROUP_NAME
        }
    });
};
