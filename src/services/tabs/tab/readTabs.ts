import { supabase } from '@/api/config';
import { SUPABASE_TABLE_TABS } from '../tabs.statics';
import { ReadGroupsWithFiltering2 } from '../tabs.types';

/**
 * Read Tabs in Supabase
 * Expose a function to fetch tabs
 * the fetch function takes a controller
 * @returns An object with a fetchFunc property.
 */
export const readTabs = (controller: AbortController) => {
    return supabase
        .from(SUPABASE_TABLE_TABS)
        .select('*')
        .abortSignal(controller.signal);
};

export const readTabsWithFilter = (controller: AbortController, filter: ReadGroupsWithFiltering2) => {
    return supabase
        .from(SUPABASE_TABLE_TABS)
        .select('*')
        .eq(filter.eq.column ?? '', filter.eq.equalTo ?? '')
        .abortSignal(controller.signal);
};

export const readAllTabs = (controller: AbortController, userId: string) => {
    return supabase.rpc('all_tabs_info', {
        p_user_id: userId
    }).abortSignal(controller.signal);
};
