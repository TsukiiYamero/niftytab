import { supabase } from '@/api/config';
import { SUPABASE_TABLE_TABS } from '../tabs.statics';
import { ReadGroupsWithFiltering2 } from '../tabs.types';

/**
 * Read Tabs in Supabase
 * Expose a function to fetch tabs
 * the fetch function takes a controller
 * @returns An object with a fetchFunc property.
 */
export const readTabs = () => {
    const fetchFunc = async (controller: AbortController) => {
        const { data, error } = await supabase
            .from(SUPABASE_TABLE_TABS)
            .select('*')
            .abortSignal(controller.signal);

        return { data: data ?? [], error };
    };

    return { fetchFunc };
};

export const readTabsWithFilter = async (filter: ReadGroupsWithFiltering2) => {
    const { data, error } = await supabase
        .from(SUPABASE_TABLE_TABS)
        .select('*').eq(filter.eq.column ?? '', filter.eq.equalTo ?? '');

    return { data, error };
};
