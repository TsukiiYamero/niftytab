import { supabase } from '@/api/config';
import { TabsSupabase } from '@/models';
import { SUPABASE_TABLE_TABS } from '../tabs.statics';
import { ReadGroupsWithFiltering2 } from '../tabs.types';

export const readTabs = async () => {
    const { data: tabs, error } = await supabase
        .from(SUPABASE_TABLE_TABS)
        .select('*');

    return { data: tabs, error };
};

export const readTabsWithFilter = async (filter: ReadGroupsWithFiltering2) => {
    const { data: tabs, error } = await supabase
        .from(SUPABASE_TABLE_TABS)
        .select('*').eq(filter.eq.column ?? '', filter.eq.equalTo ?? '');

    return { data: tabs as TabsSupabase[], error };
};
