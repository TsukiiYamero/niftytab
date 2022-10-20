import { supabase } from '@/api/config';
import { SessionTabsSupabase } from '@/models';
import { DEFAULT_SESSION_NAME, SUPABASE_TABLE_SESSION } from '../tabs.statics';
import { ReadGroupsWithFiltering2 } from '../tabs.types';

export const ReadSessions = async () => {
    const { data: sessions, error } = await supabase
        .from(SUPABASE_TABLE_SESSION)
        .select('*');

    return { data: sessions, error };
};

export const ReadSessionsWithFilter = async (filter: ReadGroupsWithFiltering2) => {
    const { data: sessions, error } = await supabase
        .from(SUPABASE_TABLE_SESSION)
        .select('*').eq(filter.eq.column ?? '', filter.eq.equalTo ?? '');

    return { data: sessions as SessionTabsSupabase[], error };
};

export const readDefaultSession = async () => {
    return await ReadSessionsWithFilter({
        eq: {
            column: 'browser_name',
            equalTo: DEFAULT_SESSION_NAME
        }
    });
};
