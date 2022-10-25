import { supabase } from '@/api/config';
import { abortController } from '@/utils/abortController';
import { supabaseTabsToNiftyTabs } from '@/utils/tabs';
import { SUPABASE_TABLE_TABS } from '../tabs.statics';
import { ReadGroupsWithFiltering2 } from '../tabs.types';

/* export const readTabs = async () => {
    const controller = abortController();

    const { data, error } = await supabase
        .from(SUPABASE_TABLE_TABS)
        .select('*')
        .abortSignal(controller.signal);

    const tabs = supabaseTabsToNiftyTabs(data ?? []);

    return { tabs, error };
};
 */
export const readTabs = () => {
    const controller = abortController();

    const apiCallFunc = async () => {
        const { data, error } = await supabase
            .from(SUPABASE_TABLE_TABS)
            .select('*')
            .abortSignal(controller.signal);

        const tabs = supabaseTabsToNiftyTabs(data ?? []);
        return { data: tabs, error };
    };

    return { apiCallFunc, controller };
};

export const readTabsWithFilter = async (filter: ReadGroupsWithFiltering2) => {
    const { data, error } = await supabase
        .from(SUPABASE_TABLE_TABS)
        .select('*').eq(filter.eq.column ?? '', filter.eq.equalTo ?? '');

    return { data, error };
};
