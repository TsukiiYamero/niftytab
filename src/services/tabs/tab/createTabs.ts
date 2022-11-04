import { supabase } from '@/api/config';
import { TabsSupabase } from '@/models';

export const createTabs = async (tabs: TabsSupabase[] = []) => {
    if (tabs.length === 0) return {
        data: [], error: null
    };

    const { data, error } = await supabase
        .from('tabs')
        .insert<TabsSupabase>(tabs);

    return { data, error };
};
