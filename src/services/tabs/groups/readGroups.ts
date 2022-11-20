import { supabase } from '@/api/config';
import { DEFAULT_GROUP_NAME, SUPABASE_TABLE_GROUPS } from '../tabs.statics';
import { ReadGroupsWithFiltering2 } from '../tabs.types';

export const readGroups = (controller: AbortController) => {
    return supabase
        .from(SUPABASE_TABLE_GROUPS)
        .select('*')
        .abortSignal(controller.signal);
};

export const readGroupsWithFilter = (controller: AbortController, filter: ReadGroupsWithFiltering2) => {
    return supabase
        .from(SUPABASE_TABLE_GROUPS)
        .select('*').eq(filter.eq.column ?? '', filter.eq.equalTo ?? '')
        .abortSignal(controller.signal);
};

export const readDefaultGroup = (controller: AbortController) => readGroupsWithFilter(controller, {
    eq: {
        column: 'title',
        equalTo: DEFAULT_GROUP_NAME
    }
});
