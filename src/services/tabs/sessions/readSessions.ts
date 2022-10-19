import { supabase } from '@/api/config';
import { DEFAULT_SESSION_NAME } from '../tabs.statics';
import { ReadGroupsWithFiltering2 } from '../tabs.types';

export const ReadSessions = async () => {
    const { data: groups, error } = await supabase
        .from('groups')
        .select('*');

    return { data: groups, error };
};

export const ReadSessionsWithFilter = async (filter: ReadGroupsWithFiltering2) => {
    const { data: groups, error } = await supabase
        .from('groups')
        .select('*').eq(filter.eq.column ?? '', filter.eq.EqualTo ?? '');

    return { data: groups, error };
};

export const readDefaultSession = async () => {
    return await ReadSessionsWithFilter({
        eq: {
            column: 'browser_name',
            EqualTo: DEFAULT_SESSION_NAME
        }
    });
};
