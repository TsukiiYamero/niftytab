import { supabase } from '@/api/config';
import { DEFAULT_SESSION_NAME, SUPABASE_TABLE_SESSION } from '../tabs.statics';
import { ReadGroupsWithFiltering2 } from '../tabs.types';

export const ReadSessions = (controller: AbortController) => {
    return supabase
        .from(SUPABASE_TABLE_SESSION)
        .select('*')
        .abortSignal(controller.signal);
};

export const ReadSessionsWithFilter = (controller: AbortController, filter: ReadGroupsWithFiltering2) => {
    return supabase
        .from(SUPABASE_TABLE_SESSION)
        .select('*').eq(filter.eq.column ?? '', filter.eq.equalTo ?? '')
        .abortSignal(controller.signal);
};

export const readDefaultSession = (controller: AbortController) => {
    return ReadSessionsWithFilter(controller, {
        eq: {
            column: 'browser_name',
            equalTo: DEFAULT_SESSION_NAME
        }
    });
};
